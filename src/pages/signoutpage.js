import React from "react";

import {UserContext} from "../context/usercontext";
import {Col, Container, Nav, NavDropdown, Row} from "react-bootstrap";
import {Navigate} from "react-router-dom";
import Button from "react-bootstrap/Button";

class Signoutpage extends React.Component {
    constructor(props) {
        super(props);
    }

    handleLogout = (setUser) => {
        if(sessionStorage.getItem("user"))
            sessionStorage.removeItem("user");

        setUser(null);
    }

    render() {
        return(
            <UserContext.Consumer>
                {({user, setUser}) => (
                    !user ? <Navigate to="/" /> :
                        <Container>
                            <Row className="justify-content-center">
                                <Col className="text-center m-1" lg="6">
                                    <h1>Sign out</h1>
                                    <Button variant='primary' onClick={(e) => {this.handleLogout(setUser)}}>
                                        Click here to sign out
                                    </Button>
                                </Col>
                            </Row>
                        </Container>
                )}
            </UserContext.Consumer>
        )
    }
}

export default Signoutpage;