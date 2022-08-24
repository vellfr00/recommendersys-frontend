import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import { Outlet, Link } from 'react-router-dom';
import React, { Component } from 'react';

import {UserContext} from "../context/usercontext";

class Navigation extends Component {
    render() {
        return (
            <>
                <Navbar bg='light' expand='lg'>
                <Container>
                    <Navbar.Brand>
                        <img src={require('../img/poliflix.png')} alt='' className='d-inline-block align-center' width='70px' height='35px' />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <Nav.Link href="/signin">Sign in</Nav.Link>
                            <Nav.Link href="/signup">Sign up</Nav.Link>
                        </Nav>
                        <UserContext.Consumer>
                            {({user, setUser}) => (
                                user &&
                                <Navbar.Text className="justify-content-end">
                                    <i>Signed in as: {user.username}</i>
                                </Navbar.Text>
                            )}
                        </UserContext.Consumer>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
                <Outlet />
            </>);
    }
}

export default Navigation;