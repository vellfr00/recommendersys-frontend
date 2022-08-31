import { Container } from 'react-bootstrap';
import { Nav } from 'react-bootstrap';
import { Navbar } from 'react-bootstrap';
import { NavDropdown } from 'react-bootstrap';
import {Outlet} from 'react-router-dom';
import React, { Component } from 'react';

import {UserContext} from "../../context/usercontext";

class Navigation extends Component {
    render() {
        return (
            <>
                <Navbar bg='light' expand='lg'>
                <Container>
                    <Navbar.Brand>
                        <img src={require('../../img/poliflix.png')} alt='' className='d-inline-block align-center' width='70px' height='35px' />
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link href="/">Home</Nav.Link>
                            <UserContext.Consumer>
                                {({user, setUser}) => (
                                    user &&
                                        <>
                                            <NavDropdown title="New preference">
                                                <NavDropdown.Item href="/selection">Movie selection</NavDropdown.Item>
                                                <NavDropdown.Item href="/ordering">Movies ordering</NavDropdown.Item>
                                            </NavDropdown>
                                            <Nav.Link href="/rate">Rate movies</Nav.Link>
                                        </>
                                )}
                            </UserContext.Consumer>
                        </Nav>
                        <UserContext.Consumer>
                            {({user, setUser}) => (
                                user ?
                                    <Nav>
                                        <NavDropdown title={user.firstname + ' ' + user.lastname}>
                                            <NavDropdown.Item href="/account">Account</NavDropdown.Item>
                                            <NavDropdown.Item href="/signout">Sign out</NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                    :
                                    <Nav>
                                        <Nav.Link className="btn btn-light btn-outline-secondary mx-1"href="/signin">Sign in</Nav.Link>
                                        <Nav.Link className="btn btn-primary text-white mx-1" href="/signup">Sign up</Nav.Link>
                                    </Nav>
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