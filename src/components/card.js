import { Component } from 'react';

class Card extends Component {
    render() {
        return (
            <div className='col'>
                <div className="card" style={{ width: '18rem', textAlign: 'center' }}>
                    <img src={this.props.card.filmCover} className="card-img-top" alt="..." style={{ padding: '10px' }} />
                    <div className="card-body">
                        <h5 className="card-title">{this.props.card.filmTitle}</h5>
                        <p className="card-text">{this.props.card.filmDesc}</p>
                        <button onClick={() => this.props.onStarred(this.props.card.id)}>
                            <i class="bi bi-star-fill"></i>
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Card;