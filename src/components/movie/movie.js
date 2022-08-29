import React from "react";
import Card from "react-bootstrap/Card";

import image_not_available from '../../img/image_not_available.png'

const IMDBPosters_BaseURI = 'https://imdb-api.com/en/API/Posters/k_9tq249sp/tt';

class Movie extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            imgSrc: image_not_available
        };
    }

    getPosterImage = () => {
        fetch(IMDBPosters_BaseURI + this.props.movie.imdbId)
            .then((res) => res.json())
            .then((document) => {
                if(document.posters.length > 0) {
                    this.setState({imgSrc: document.posters[0].link});
                } else {
                    this.setState({imgSrc: image_not_available});
                }
            }).catch((error) => {
            this.setState({imgSrc: image_not_available});
        });
    }

    componentDidMount() {
        this.getPosterImage();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.movie.movieId !== prevProps.movie.movieId)
            this.getPosterImage();
    }

    render() {
        return (
            <Card className={"bg-dark border-light text-white " + this.props.className}>
                <Card.Img src={this.state.imgSrc} alt="Loading Movie Poster..."/>
                <Card.ImgOverlay className="h-100 d-flex flex-column justify-content-end movie-card-overlay">
                    <Card.Title className="align-bottom">{this.props.movie.title}</Card.Title>
                    <Card.Text className="align-bottom">{this.props.movie.genres}</Card.Text>
                </Card.ImgOverlay>
            </Card>
        );
    }
}

export default Movie;