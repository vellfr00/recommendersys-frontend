import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navigation from './components/navigation'
import Homepage from './pages/homepage';
import Signinpage from './pages/signinpage';
import Signuppage from './pages/signuppage';

import {UserContext} from "./context/usercontext";

class App extends Component {
    constructor(props) {
        super(props);

        this.setUser = (newUser) => {
            this.setState({user: newUser});
            sessionStorage.setItem("user", JSON.stringify(newUser));
        };

        if(sessionStorage.getItem("user")) {
            this.state = {
                user: JSON.parse(sessionStorage.getItem("user")),
                setUser: this.setUser
            }
        } else {
            this.state = {
                user: null,
                setUser: this.setUser,
            };
        }
    }

    render() {
        return (
            <UserContext.Provider value={this.state}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Navigation />}>
                            <Route index element={<Homepage />} />
                            <Route exact path="/signin" element={<Signinpage />} />
                            <Route exact path="/signup" element={<Signuppage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        );
    }
}

export default App;
