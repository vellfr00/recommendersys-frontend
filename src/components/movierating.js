import React from "react";
import {Form} from "react-bootstrap";
import Movie from "./movie";
import Button from "react-bootstrap/Button";
import StarsRating from "stars-rating/dist/stars-rating";

const baseURI = 'http://localhost:8080/api';

class Movierating extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            rating: 0
        }
    }

    handleChange = (rating) => {
        this.setState({rating: rating});
    }

    handleSubmit = (e) => {
        e.preventDefault();

        fetch(baseURI + '/ratings/' + this.props.movie.movieId, {
            method: 'POST',

            headers: new Headers({
                "Content-Type": "application/json"
            }),

            body: JSON.stringify({
                username: this.props.username,
                rating: this.state.rating
            })
        }).then((res) => {
            if(res.status === 200) {
                this.props.cb(true, "Rating saved", this.props.movie.movieId);
            } else {
                res.json().then((document) => {
                    this.props.cb(false, document.message, this.props.movie.movieId);
                });
            }
        }).catch((error) => {
            this.props.cb(false, error.message, this.props.movie.movieId);
        });
    }

    render() {
        return(
            <Form onSubmit={this.handleSubmit}>
                <Movie movie={this.props.movie} />
                <StarsRating
                    count={5}
                    onChange={this.handleChange}
                    value={this.state.rating}
                    size={30}
                    color2={'#ffd700'} />
                <Button type="submit">Rate {this.state.rating}/5</Button>
            </Form>
        );
    }

}

export default Movierating;