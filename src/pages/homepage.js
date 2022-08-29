import React, { Component } from 'react';
import {Col, Container, Row} from "react-bootstrap";

class Homepage extends Component {
    render() {
        return(
            <Container>
                <Row className="justify-content-center m-1">
                    <Col lg="6" className="text-center">
                        <h1 className="text-center">Homepage</h1>
                    </Col>
                </Row>
                <Row className="justify-content-center m-1">

                </Row>
            </Container>
        );
    }
}

export default Homepage;