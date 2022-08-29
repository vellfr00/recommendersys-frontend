import React from "react";
import {Col, Container, FloatingLabel, Form, Row} from "react-bootstrap";
import Servermessage from "../../components/layout/servermessage";
import Button from "react-bootstrap/Button";
import {UserContext} from "../../context/usercontext";
import {Navigate} from "react-router-dom";

const baseURI = 'http://localhost:8080/api';

class Accountpage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serverSuccess: false,
            serverMessage: "",

            deleted: false
        };
    }

    handleDelete = (e, user) => {
        e.preventDefault();

        fetch(baseURI + '/users/' + user.username, {
            method: 'DELETE'
        }).then((res) => {
            if(res.status === 200) {
                this.setState({deleted: true});
            } else {
                res.json().then((document) => {
                    this.setState({serverSuccess: false, serverMessage: document.message});
                });
            }
        }).catch((error) => {
            this.setState({serverSuccess: false, serverMessage: error.message});
        });
    }

    render() {
        if(this.state.deleted)
            return (<Navigate to='/signout' />);

        return (
            <UserContext.Consumer>
                {({user, setUser}) => (
                    !user ?
                        <Container>
                            <Row className="justify-content-center m-1">
                                <Col lg="6" className="text-center">
                                    <h1 className="text-center">Account</h1>
                                    <Servermessage serverSuccess={false} serverMessage="You are not signed in" />
                                </Col>
                            </Row>
                        </Container>
                        :
                        <Container>
                            <Row className="justify-content-center m-1">
                                <Col lg="6" className="text-center">
                                    <h1 className="text-center">Account</h1>
                                    <Servermessage serverSuccess={this.state.serverSuccess} serverMessage={this.state.serverMessage} />
                                </Col>
                            </Row>
                            <Row className="justify-content-center m-1">
                                <Form onSubmit={(e) => this.handleDelete(e, user)}>
                                    <Form.Group>
                                        <Row className="justify-content-center p-1">
                                            <Col lg="6">
                                                <FloatingLabel label="Username">
                                                    <Form.Control placeholder="Username" type='text' name='username' value={user.username} disabled/>
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-center p-1">
                                            <Col lg="3">
                                                <FloatingLabel label="First name">
                                                    <Form.Control placeholder="First name" type='text' name='firstname' value={user.firstname} disabled/>
                                                </FloatingLabel>
                                            </Col>
                                            <Col lg="3">
                                                <FloatingLabel label="Last name">
                                                    <Form.Control placeholder="Last name" type='text' name='lastname' value={user.lastname} disabled/>
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                        <Row className="justify-content-center p-1">
                                            <Col lg="4">
                                                <FloatingLabel label="Gender">
                                                    <Form.Control placeholder="Gender" type='text' name='gender' value={user.gender} disabled/>
                                                </FloatingLabel>
                                            </Col>
                                            <Col lg="2">
                                                <FloatingLabel label="Age">
                                                    <Form.Control placeholder="Age" type='number' name='age' value={user.age} disabled/>
                                                </FloatingLabel>
                                            </Col>
                                        </Row>
                                    </Form.Group>
                                    <Row className="justify-content-center m-1" lg="6">
                                        <Button variant='danger' type='submit'>
                                            Delete account
                                        </Button>
                                    </Row>
                                </Form>
                            </Row>
                        </Container>
                )}
            </UserContext.Consumer>
        );
    }
}

export default Accountpage;