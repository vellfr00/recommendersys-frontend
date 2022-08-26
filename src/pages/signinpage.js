import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Servermessage from '../components/servermessage'
import {Col, Container, FloatingLabel, Row} from 'react-bootstrap';
import {UserContext} from "../context/usercontext";
import {Navigate} from "react-router-dom";

const baseURI = 'http://localhost:8080/api';

class Signinpage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            serverSuccess: true,
            serverMessage: "",

            username: "",
            elicitationId: ""
        }
    }

    handleLogin = (e, setUser) => {
        e.preventDefault();

        fetch(baseURI + '/users/' + this.state.username + '?elicitationId=' + this.state.elicitationId)
            .then((res) => {
            if (res.status === 200) {
                res.json().then((document) => {
                    setUser(document);
                });
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
            <UserContext.Consumer>
                {({user, setUser}) => (
                    user ? <Navigate to={'/'} /> :
                    <Container>
                        <Row className="justify-content-center m-1">
                            <Col lg="6">
                                <h1 className="text-center">Sign in</h1>
                                <Servermessage serverSuccess={this.state.serverSuccess} serverMessage={this.state.serverMessage} />
                            </Col>
                        </Row>
                        <Form onSubmit={(e) => {this.handleLogin(e, setUser)}}>
                            <Form.Group>
                                <Row className="justify-content-center p-1">
                                    <Col lg="6">
                                        <FloatingLabel label="Username">
                                            <Form.Control placeholder="Username" type='text' name='username' value={this.state.username} onChange={this.handleChange} />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                                <Row className="justify-content-center p-1">
                                    <Col lg="6">
                                        <FloatingLabel label="ElicitationId">
                                            <Form.Control placeholder="ElicitationId" type='number' name='elicitationId' value={this.state.elicitationId} onChange={this.handleChange} />
                                        </FloatingLabel>
                                    </Col>
                                </Row>
                            </Form.Group>
                            <Row className="justify-content-center m-1" lg="6" >
                                <Button variant='primary' type='submit'>
                                    Sign in
                                </Button>
                            </Row>
                        </Form>
                    </Container>
                )}
            </UserContext.Consumer>
        );
    }
}

export default Signinpage;