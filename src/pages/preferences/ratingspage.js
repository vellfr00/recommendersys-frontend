import React from "react";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import Servermessage from "../../components/layout/servermessage";
import {UserContext} from "../../context/usercontext";
import Movierating from "../../components/movie/movierating";

const baseURI = 'http://localhost:8080/api';

class Ratingspage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serverSuccess: false,
            serverMessage: "",

            movies: null,
            toRate: null
        };
    }

    handleCallback = (serverSuccess, serverMessage, movieId) => {
        this.setState({serverSuccess: serverSuccess, serverMessage: serverMessage});

        if(serverSuccess) {
            let toRateBuffer = [...this.state.toRate];
            let moviesBuffer = [...this.state.movies];

            let index = moviesBuffer.findIndex((movie) => movie.movieId === movieId);

            console.log(index);

            toRateBuffer.splice(index, 1);
            moviesBuffer.splice(index, 1);

            this.setState({toRate: toRateBuffer, movies: moviesBuffer});
        }
    }

    componentDidMount() {
        let {user, setUser} = this.context;

        if(user)
            fetch(baseURI + '/ratings/' + user.username + '?rated=false')
            .then((res) => {
                if(res.status === 200) {
                    res.json().then(async (document) => {
                        let forms = document.map((movie, index) =>
                            <Col className="justify-content-center m-1" lg="3" key={index}>
                                <Movierating cb={this.handleCallback} movie={movie} username={user.username} />
                            </Col>
                        );

                        this.setState({movies: document, toRate: forms});
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
        if(!this.state.toRate) {
            return (
                <Container>
                    <Row className="justify-content-center m-1">
                        <Col lg="6" className="text-center">
                            <h1 className="text-center">Rate movies</h1>
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
                                    <h1 className="text-center">Rate movies</h1>
                                    <Servermessage serverSuccess={false} serverMessage="You are not signed in" />
                                </Col>
                            </Row>
                        </Container>
                        :
                        <Container>
                            <Row className="justify-content-center m-1">
                                <Col lg="6" className="text-center">
                                    <h1 className="text-center">Rate movies</h1>
                                    <Servermessage serverSuccess={this.state.serverSuccess} serverMessage={this.state.serverMessage} />
                                </Col>
                            </Row>
                            <Row className="justify-content-center m-1">
                                <p className="text-center">Rate your favourite movies from 0 to 5 stars, then click 'Rate'</p>
                            </Row>
                            <Row className="justify-content-center m-1">
                                {this.state.toRate}
                            </Row>
                        </Container>
                )}
            </UserContext.Consumer>
        );
    }
}

Ratingspage.contextType = UserContext;

export default Ratingspage;