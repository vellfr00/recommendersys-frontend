import React from "react";
import {Form} from "react-bootstrap";
import Movie from "./movie";

class Movieselect extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value
        }
    }

    handleChange = (e) => {
        this.setState({value: e.target.value});
        this.props.onChange(this.props.index, e.target.value);
    }

    render() {
        return(
            <>
                <Form.Select className="mb-1" value={this.state.value} onChange={this.handleChange}>
                    {this.props.options}
                </Form.Select>
                <Movie movie={this.props.movies.find((movie) => movie.movieId === parseInt(this.state.value))} />
            </>
        );
    }

}

export default Movieselect;