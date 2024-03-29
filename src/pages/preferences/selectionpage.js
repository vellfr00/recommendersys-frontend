import React from "react";
import Movie from "../../components/movie/movie";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import Servermessage from "../../components/layout/servermessage";
import Button from "react-bootstrap/Button";
import {UserContext} from "../../context/usercontext";

const baseURI = 'http://localhost:8080/api';

class Selectionpage extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            serverSuccess: false,
            serverMessage: "",

            proposed: [],
            proposedMovieCards: null,
            choice: [],
            currentChoice: null     //rappresenta il film selezionato tra i due proposti temporaneamente per poi salvarlo in choice[]
        };
    }

    //prendo il valore del film e lo assegno a currentChoice

    handleChange = (e) => {
        let choices = this.state.choice;
        const nextChoice = parseInt(e.target.value);
        
        if(this.state.currentChoice){
            let choiceToRemoveIndex = choices.indexOf(this.state.currentChoice);

            choices.splice(choiceToRemoveIndex,1);
        }

        choices = [nextChoice,...choices]   //creiamo una nuova lista con un elemento nuovo + tutti gli altri elementi della lista

        this.setState({choice: choices, currentChoice:nextChoice});
    }

    handleSubmit = (e, username) => {
        e.preventDefault();

        fetch(baseURI + '/preferences/' + username + '?type=selection', {
            method: "POST",

            headers: new Headers({
                "Content-Type": "application/json"
            }),

            body: JSON.stringify({
                proposed: this.state.proposed,
                choice: this.state.choice,
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
        fetch(baseURI + '/movies/proposed?type=selection&policy=probability')
            .then((res) => {
                if(res.status === 200) {
                    res.json().then(async (document) => {
                        let newProposedIds = await document.movies.map((movie) => movie.movieId);
                        let proposed = [newProposedIds,...this.state.proposed];
                        let movieCards = await document.movies.map((movie, index) =>
                            <Col key={index} className="p-1" lg="4">
                                <label>
                                    <input
                                        className="card-input-element"
                                        type="radio"
                                        name="choice"
                                        value={movie.movieId}
                                        onChange={this.handleChange}
                                    />
                                    <Movie className="card-input" movie={movie} />
                                </label>
                            </Col>
                        );

                        this.setState({proposed: proposed, proposedMovieCards: movieCards});
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

    // metodo per fare il reload solo delle moviesCard ed evitare di ricaricare l'intera pagina quando si preme next

    resetAndShowNextProposedMovies(){
        this.setState({currentChoice:null, proposedMovieCards:null});

        this.componentDidMount();
    }

    skipChoice(){
        this.state.proposed.shift();
        this.resetAndShowNextProposedMovies();
    }

    render() {
        if(!this.state.proposedMovieCards) {
            return (
                <Container>
                    <Row className="justify-content-center m-1">
                        <Col lg="6" className="text-center">
                            <h1 className="text-center">Movie selection</h1>
                            <Spinner className="m-1" animation="border" />
                            <Servermessage serverSuccess={this.state.serverSuccess} serverMessage={this.state.serverMessage} />
                        </Col>
                    </Row>
                </Container>
            );
        }

        let nextChoicesButton;
        if(this.state.currentChoice!=null){
            nextChoicesButton=<Button className="btn-block m-1" variant='outline-primary' onClick={() => this.resetAndShowNextProposedMovies()}>Next</Button>;
        }else{
            nextChoicesButton=<Button className="btn-block m-1" variant='outline-primary' onClick={() => this.skipChoice()}>Skip</Button>;
        }

        return (
            <UserContext.Consumer>
                {({user, setUser}) => (
                    !user ?
                        <Container>
                            <Row className="justify-content-center m-1">
                                <Col lg="6" className="text-center">
                                    <h1 className="text-center">Movie selection</h1>
                                    <Servermessage serverSuccess={false} serverMessage="You are not signed in" />
                                </Col>
                            </Row>
                        </Container>
                        :
                        <Container>
                            <Row className="justify-content-center m-1">
                                <Col lg="6" className="text-center">
                                    <h1 className="text-center">Movie selection</h1>
                                    <Servermessage serverSuccess={this.state.serverSuccess} serverMessage={this.state.serverMessage} />
                                </Col>
                            </Row>
                            <Row className="justify-content-center m-1">
                                <p className="text-center">Select your preference from the movies proposed below, then click 'Confirm selection'</p>
                                <p className="text-center">Click 'Next' to go to the next proposed movies</p>
                                <form onSubmit={(e) => {this.handleSubmit(e, user.username)}}>
                                    <Row className="justify-content-center m-1" lg="6">
                                        <Button className="btn-block m-1" variant='success' type='submit' disabled={this.state.proposed.length < 5 || this.state.currentChoice==null}>Confirm selection</Button>
                                        {nextChoicesButton}
                                    </Row>
                                    <Row className="justify-content-center m-1">
                                        {this.state.proposedMovieCards}
                                    </Row>
                                </form>
                            </Row>
                        </Container>
                )}
            </UserContext.Consumer>
        );
    }
}

export default Selectionpage;