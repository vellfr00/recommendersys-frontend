import React from 'react'
import {Alert} from "react-bootstrap";

class Servermessage extends React.Component {
    render() {
        if(!this.props.serverMessage || this.props.serverMessage.length === 0)
            return(<></>);

        if(this.props.serverSuccess)
            return(
                <Alert variant="success">
                    <Alert.Heading>Success</Alert.Heading>
                    <hr />
                    <p>{this.props.serverMessage}</p>
                </Alert>
            );

        return (
            <Alert variant="danger">
                <Alert.Heading>Error</Alert.Heading>
                <hr />
                <p>{this.props.serverMessage}</p>
            </Alert>
        );
    }
}

export default Servermessage;