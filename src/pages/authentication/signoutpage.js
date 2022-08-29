import React from "react";

import {UserContext} from "../../context/usercontext";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import {Navigate} from "react-router-dom";

class Signoutpage extends React.Component {
    componentDidMount() {
        let {user, setUser} = this.context;

        if(sessionStorage.getItem('user'))
            sessionStorage.removeItem('user');

        if(user)
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
                                    <Spinner className="m-1" animation="border" />
                                </Col>
                            </Row>
                        </Container>
                )}
            </UserContext.Consumer>
        )
    }
}

Signoutpage.contextType = UserContext;

export default Signoutpage;