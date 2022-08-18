import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Servermessage from '../components/servermessage'

const baseURI='http://localhost:8080/api';

class Signuppage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serverSuccess: true,
            serverMessage: "",

            username: "",
            firstname: "",
            lastname: "",
            age: "",
            gender: "",
            elicitationId: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const body = e.target.body;

        fetch(baseURI + '/users/', {
            method: "POST",

            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            body: JSON.stringify({
                username: this.state.username,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                gender: this.state.gender,
                age: this.state.age,
                elicitationId: this.state.elicitationId
            })
        }).then((res) => {
            if(res.status === 200) {
                this.setState({serverSuccess: true, serverMessage: "User registered successfully"});
            } else {
                res.json().then((document) => {
                    this.setState({serverSuccess: false, serverMessage: document.message});
                });
            }
        }).catch((error) => {
            this.setState({serverSuccess: false, serverMessage: error.message});
        });
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value});
    }

    render() {
        return (
            <>
                <h1>Signup</h1>
                <Servermessage serverSuccess={this.state.serverSuccess} serverMessage={this.state.serverMessage} />
                <Form onSubmit={this.handleSubmit}>
                    <Form.Group className='mb-3'>
                        <Form.Label>
                            Username
                        </Form.Label>
                        <Form.Control type='text' name='username' value={this.state.username} onChange={this.handleChange}/>
                        <Form.Label>
                            Firstname
                        </Form.Label>
                        <Form.Control type='text' name='firstname' value={this.state.firstname} onChange={this.handleChange}/>
                        <Form.Label>
                            Lastname
                        </Form.Label>
                        <Form.Control type='text' name='lastname' value={this.state.lastname} onChange={this.handleChange}/>
                        <Form.Label>
                            Gender
                        </Form.Label>
                        <Form.Select name='gender' value={this.state.gender} onChange={this.handleChange}>
                            <option>Select your gender</option>
                            <option value={'m'}>Male</option>
                            <option value={'f'}>Female</option>
                        </Form.Select>
                        <Form.Label>
                            Age
                        </Form.Label>
                        <Form.Control type='number' name='age' value={this.state.age} onChange={this.handleChange}/>
                        <Form.Label>
                            ElicitationId
                        </Form.Label>
                        <Form.Control type='number' name='elicitationId' value={this.state.elicitationId} onChange={this.handleChange}/>
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Signup
                    </Button>
                </Form>
            </>
        );
    }
}

export default Signuppage;