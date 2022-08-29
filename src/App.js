import React, { Component } from 'react';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Navigation from './components/layout/navigation'
import Homepage from './pages/homepage';
import Signinpage from './pages/authentication/signinpage';
import Signuppage from './pages/authentication/signuppage';

import {UserContext} from "./context/usercontext";
import Selectionpage from "./pages/preferences/selectionpage";
import Signoutpage from "./pages/authentication/signoutpage";
import Orderingpage from "./pages/preferences/orderingpage";
import Ratingspage from "./pages/preferences/ratingspage";
import Accountpage from "./pages/authentication/accountpage";

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
                            <Route exact path="/selection" element={<Selectionpage />} />
                            <Route exact path="/signout" element={<Signoutpage />} />
                            <Route exact path="/ordering" element={<Orderingpage />} />
                            <Route exact path="/rate" element={<Ratingspage />} />
                            <Route exact path="/account" element={<Accountpage />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </UserContext.Provider>
        );
    }
}

export default App;
