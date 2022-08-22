import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Servermessage from '../components/servermessage'
import { Col, Container, Row } from 'react-bootstrap';

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

    handleLogin = (e) => {
        e.preventDefault();

        const body = e.target.body;

        fetch(baseURI + '/users/', {
            method: "POST",

            headers: new Headers({
                'Content-Type': 'application/json'
            }),

            body: JSON.stringify({
                username: this.state.username,
                elicitationId: this.state.elicitationId
            })
        }).then((res) => {
            if (res.status === 200) {
                this.setState({ serverSuccess: true, serverMessage: "User logged successfully" });
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
            <>
                <Container>
                    <Row className="justify-content-center">
                        <Col lg="2">
                            <h1>Signin</h1>
                        </Col>
                    </Row>
                    <Servermessage serverSuccess={this.state.serverSuccess} serverMessage={this.state.serverMessage} />
                    <Form onSubmit={this.handleLogin}>
                        <Form.Group>
                            <Row className="justify-content-center">
                                <Col lg="6">
                                    <Form.Label>
                                        Username
                                    </Form.Label>
                                    <Form.Control type='text' name='username' value={this.state.username} onChange={this.handleChange} />
                                </Col>
                            </Row>
                            <Row className="justify-content-center">
                                <Col lg="6">
                                    <Form.Label>
                                        ElicitationId
                                    </Form.Label>
                                    <Form.Control type='number' name='elicitationId' value={this.state.elicitationId} onChange={this.handleChange} />
                                </Col>
                            </Row>
                        </Form.Group>
                        <Row className="justify-content-center" lg="6" style={{ marginTop: "10px" }}>
                            <Button variant='primary' type='submit'>
                                Signin
                            </Button>
                        </Row>
                    </Form>
                </Container>
            </>
        );
    }
}

export default Signinpage;