import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navigation from './components/navigation'
import Homepage from './pages/homepage';
import Signinpage from './pages/signinpage';
import Signuppage from './pages/signuppage';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
        };
    }

    render() {
        return (
            <>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigation />}>
                            <Route index element={<Homepage />} />
                            <Route exact path="/signin" element={<Signinpage />} />
                            <Route exact path="/signup" element={<Signuppage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </>
        );
    }
}

export default App;
