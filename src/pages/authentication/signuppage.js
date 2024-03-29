import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Servermessage from '../../components/layout/servermessage'
import {Col, Container, FloatingLabel, Row} from 'react-bootstrap';

const baseURI = 'http://localhost:8080/api';

class Signuppage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serverSuccess: true,
            serverMessage: "",

            username: "",
            password: "",
            firstname: "",
            lastname: "",
            age: "",
            gender: "",
            elicitationId: ""
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();

        fetch(baseURI + '/users/', {
            method: "POST",

            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
                gender: this.state.gender,
                age: this.state.age,
            })
        }).then((res) => {
            if (res.status === 200) {
                this.setState({ serverSuccess: true, serverMessage: "User registered successfully" });
            } else {
                res.json().then((document) => {
                    this.setState({ serverSuccess: false, serverMessage: document.message });
                });
            }
        }).catch((error) => {
            this.setState({ serverSuccess: false, serverMessage: error.message });
        });
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    render() {
        return (
                <Container>
                    <Row className="justify-content-center m-1">
                        <Col lg="6" className="text-center">
                            <h1 className="text-center">Sign up</h1>
                            <Servermessage serverSuccess={this.state.serverSuccess} serverMessage={this.state.serverMessage} />
                        </Col>
                    </Row>
                    <Form onSubmit={this.handleSubmit}>
                        <Form.Group>
                            <Row className="justify-content-center p-1">
                                <Col lg="4">
                                    <FloatingLabel label="Username">
                                        <Form.Control placeholder="Username" type='text' name='username' value={this.state.username} onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                                <Col lg="2">
                                    <FloatingLabel label="Password">
                                        <Form.Control placeholder="Password" type='password' name='password' value={this.state.password} onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row className="justify-content-center p-1">
                                <Col lg="3">
                                    <FloatingLabel label="First name">
                                        <Form.Control placeholder="First name" type='text' name='firstname' value={this.state.firstname} onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                                <Col lg="3">
                                    <FloatingLabel label="Last name">
                                        <Form.Control placeholder="Last name" type='text' name='lastname' value={this.state.lastname} onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                            <Row className="justify-content-center p-1">
                                <Col lg="4">
                                    <FloatingLabel label="Gender">
                                        <Form.Select placeholder="Gender" name='gender' value={this.state.gender} onChange={this.handleChange}>
                                            <option>Select your gender</option>
                                            <option value={'m'}>Male</option>
                                            <option value={'f'}>Female</option>
                                        </Form.Select>
                                    </FloatingLabel>
                                </Col>
                                <Col lg="2">
                                    <FloatingLabel label="Age">
                                        <Form.Control placeholder="Age" type='number' name='age' value={this.state.age} onChange={this.handleChange} />
                                    </FloatingLabel>
                                </Col>
                            </Row>
                        </Form.Group>
                        <Row className="justify-content-center m-1" lg="6">
                            <Button variant='primary' type='submit'>
                                Sign up
                            </Button>
                        </Row>
                    </Form>
                </Container>
        );
    }
}

export default Signuppage;