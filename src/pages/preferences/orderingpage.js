import React from "react";
import {Col, Container, Form, Row, Spinner} from "react-bootstrap";
import Servermessage from "../../components/layout/servermessage";
import Button from "react-bootstrap/Button";
import {UserContext} from "../../context/usercontext";
import Movieselect from "../../components/movie/movieselect";

const baseURI = 'http://localhost:8080/api';

class Orderingpage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serverSuccess: false,
            serverMessage: "",

            proposed: [],
            proposedMovieCards: null,
            selectForms: null,
            choice: []
        };
    }

    handleChange = (index, value) => {
        let choiceBuffer = [...this.state.choice];
        choiceBuffer[index] = parseInt(value);
        this.setState({choice: choiceBuffer});
    }

    handleSubmit = (e, username) => {
        e.preventDefault();

        fetch(baseURI + '/preferences/' + username + '?type=ordering', {
            method: "POST",

            headers: new Headers({
                "Content-Type": "application/json"
            }),

            body: JSON.stringify({
                proposed: this.state.proposed,
                choice: this.state.choice
            })
        }).then((res) => {
            if(res.status === 200) {
                window.location.reload();
            } else {
                res.json().then((document) => {
                    this.setState({serverSuccess: false, serverMessage: document.message});
                });
            }
        }).catch((error) => {
            this.setState({serverSuccess: false, serverMessage: error.message});
        });
    }

    componentDidMount() {
        fetch(baseURI + '/movies/proposed?type=ordering&policy=probability')
            .then((res) => {
                if(res.status === 200) {
                    res.json().then(async (document) => {
                        let proposedIds = await document.movies.map((movie) => movie.movieId);
                        this.setState({proposed: proposedIds, choice: proposedIds}, async () => {
                            let options = await document.movies.map((movie, index) =>
                                <option key={index} value={movie.movieId}>{movie.title}</option>
                            );

                            let movies = document.movies;
                            let selectForms = await document.movies.map((movie, index) =>
                                <Col className="justify-content-center p-1" key={index} lg="2">
                                    <h4 className="text-center">Movie #{index + 1}</h4>
                                    <Movieselect movies={movies} index={index} options={options} onChange={this.handleChange} value={movie.movieId}/>
                                </Col>
                            );

                            this.setState({selectForms: selectForms});
                        });
                    });
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
        if(!this.state.selectForms) {
            return (
                <Container>
                    <Row className="justify-content-center m-1">
                        <Col lg="6" className="text-center">
                            <h1 className="text-center">Movies ordering</h1>
                            <Spinner className="m-1" animation="border" />
                            <Servermessage serverSuccess={this.state.serverSuccess} serverMessage={this.state.serverMessage} />
                        </Col>
                    </Row>
                </Container>
            );
        }

        return (
            <UserContext.Consumer>
                {({user, setUser}) => (
                    !user ?
                        <Container>
                            <Row className="justify-content-center m-1">
                                <Col lg="6" className="text-center">
                                    <h1 className="text-center">Movies ordering</h1>
                                    <Servermessage serverSuccess={false} serverMessage="You are not signed in" />
                                </Col>
                            </Row>
                        </Container>
                        :
                        <Container>
                            <Row className="justify-content-center m-1">
                                <Col lg="6" className="text-center">
                                    <h1 className="text-center">Movies ordering</h1>
                                    <Servermessage serverSuccess={this.state.serverSuccess} serverMessage={this.state.serverMessage} />
                                </Col>
                            </Row>
                            <Row className="justify-content-center m-1">
                                <p className="text-center">Order the movies proposed below based on your preferences, then click 'Confirm order'</p>
                                <p className="text-center">Movie #1 should be your most favourite movie</p>
                                <p className="text-center">Click 'Next' to go to the next proposed movies</p>
                                <Form onSubmit={(e) => {this.handleSubmit(e, user.username)}}>
                                    <Row className="justify-content-center m-1" lg="6">
                                        <Button className="btn-block m-1" variant='success' type='submit' disabled={this.state.choice === 0}>Confirm order</Button>
                                        <Button className="btn-block m-1" variant='outline-primary' onClick={() => window.location.reload()}>Next</Button>
                                    </Row>
                                    <Container fluid>
                                        <Row className="justify-content-center m-2 h-100">
                                            {this.state.selectForms}
                                        </Row>
                                    </Container>
                                </Form>
                            </Row>
                        </Container>
                )}
            </UserContext.Consumer>
        );
    }
}

export default Orderingpage;