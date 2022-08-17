import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

const baseURI='http://localhost:8080/api';

class Signuppage extends Component {
    render() {
        return (
            <>
                <h1>Signup</h1>
                <Form method='post' action={baseURI+'/users/'}>
                    <Form.Group classname='mb-3'>
                        <Form.Label>
                            Username
                        </Form.Label>
                        <Form.Control type='text' name='username'/>
                        <Form.Label>
                            Lastname
                        </Form.Label>
                        <Form.Control type='text' name='lastname'/>
                        <Form.Label>
                            Firstname
                        </Form.Label>
                        <Form.Control type='text' name='firstname'/>
                        <Form.Label>
                            Gender
                        </Form.Label>
                        <Form.Select name='gender'>
                            <option value={'m'}>Male</option>
                            <option value={'f'}>Female</option>
                        </Form.Select>
                        <Form.Label>
                            Age
                        </Form.Label>
                        <Form.Control type='number' name='age'/>
                        <Form.Label>
                            ElicitationId
                        </Form.Label>
                        <Form.Control type='number' name='elicitationId'/>
                    </Form.Group>
                    <Button variant='primary' type='submit'>
                        Signup
                    </Button>
                </Form>
            </>
        );
    }
}

export default Signuppage;