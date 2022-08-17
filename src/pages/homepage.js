import React, { Component } from 'react';
import Card from '../components/card';

import thor from '../img/thor.jpg';

class Homepage extends Component {
    render() {
        return (
            <main>
                <h1>Homepage</h1>
                <Card
                    card={{
                        filmTitle: 'prova',
                        filmDesc: 'prova',
                        filmCover: thor
                    }
                    }
                />
            </main>
        );
    }
}

export default Homepage;