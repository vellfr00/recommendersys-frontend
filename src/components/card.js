import { Component } from 'react';

class Card extends Component {
    constructor(props) {
        super(props);

        this.state = {
            icon: "bi bi-star"
        };

        this.handleStarred = this.handleStarred.bind(this);
    }

    handleStarred() {
        this.setState({icon: "bi bi-star-fill"});
    }

    render() {
        return (
            <div className='col'>
                <div className="card" style={{ width: '18rem', textAlign: 'center' }}>
                    <img src={this.props.card.filmCover} className="card-img-top" alt="..." style={{ padding: '10px' }} />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.card.filmTitle}</h5>
                        <p className="card-text">{this.props.card.filmDesc}</p>
                        <button onClick={this.handleStarred}>
                            <i className={this.state.icon} ></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;