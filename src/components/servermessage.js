import React from 'react'
import {Alert} from "react-bootstrap";

class Servermessage extends React.Component {
    render() {
        if(!this.props.serverMessage || this.props.serverMessage.length === 0)
            return(<></>);

        if(this.props.serverSuccess)
            return(
                <Alert variant="success">
                    <p>{this.props.serverMessage}</p>
                </Alert>
            );

        return (
            <Alert variant="danger">
                <p>{this.props.serverMessage}</p>
            </Alert>
        );
    }
}

export default Servermessage;