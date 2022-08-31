import React, { Component } from 'react';
import {Col, Container, Row} from "react-bootstrap";

import {UserContext} from "../context/usercontext";
import Button from "react-bootstrap/Button";

class Homepage extends Component {
    render() {
        return(
            <Container>
                <Row className="justify-content-center m-1">
                    <Col lg="6" className="text-center">
                        <h1 className="text-center">Homepage</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center text-center m-1">
                    <UserContext.Consumer>
                        {({user, setUser}) => (
                            !user ?
                                <>
                                    <p>Welcome!</p>
                                    <Col className="justify-content-center text-center m-1">
                                        <Button variant="light" className="btn-outline-secondary m-1" href="/signin">Sign in</Button>
                                        <Button className="btn btn-primary m-1" href="/signup">Sign up</Button>
                                    </Col>
                                </>
                                :
                                <>
                                    <p>Welcome, {user.firstname} {user.lastname}!</p>
                                    <Row className="justify-content-center text-center m-1">
                                        <Col className="justify-content-center text-center m-1">
                                            <Button className="btn-secondary text-white m-1" href="/selection">Movie selection</Button>
                                            <Button className="btn-secondary text-white m-1" href="/ordering">Movies ordering</Button>
                                            <Button className="btn-warning m-1" href="/rate">Rate movies</Button>
                                        </Col>
                                    </Row>
                                </>
                        )}
                    </UserContext.Consumer>
                </Row>
            </Container>
        );
    }
}

export default Homepage;