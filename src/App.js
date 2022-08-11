import Navbar from './components/navbar';
import Card from './components/card';
import React, { Component } from 'react';

import doctorStrange from './img/doctor strange.jpg'
import thor from './img/thor.jpg'
import wakanda from './img/wakanda.jpg'

class App extends Component {
  state = {
    cards: [
      { id: 0, filmCover: doctorStrange, filmTitle: "Doctor Strange", filmDesc: "Un medico resta vittima di un tragico incidente, ma viene aiutato da uno stregone che lo inizia alle arti magiche, grazie alle quali egli riesce a redimersi e a combattere le forze oscure che minacciano l'umanità." },
      { id: 0, filmCover: thor, filmTitle: "Thor", filmDesc: "Thor chiede l'aiuto di Valchiria, Korg e dell'ex fidanzata Jane Foster per combattere Gorr, che vuole sterminare tutti gli dei e portarli all'estinzione. I tre partono così per un'avventura cosmica per sconfiggerlo." },
      { id: 0, filmCover: wakanda, filmTitle: "Black Panther", filmDesc: "Black Panther: Wakanda Forever è un film del 2022 diretto e co-scritto da Ryan Coogler. Basato sul personaggio di Pantera Nera della Marvel Comics, è il trentesimo film del Marvel Cinematic Univers" },
    ]
  }

  handleStarred = cardID => {
    const cards = this.state.cards.filter(card => card.id !== cardID)
    this.setState({cards})
  }

  render() {
    return (
      <>
        <Navbar />
        <div className='container'>
          <hr />
          <div className='row'>
            {this.state.cards.map(card => (
              <Card
                key={card.id}
                onStarred={this.handleStarred}
                card={card}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default App;
