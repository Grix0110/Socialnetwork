import { Component } from "react";
import Registration from "./Registration";
import Login from "./Login";
import ResetPassword from "./ResetPassword";
import { BrowserRouter, Route, Link } from "react-router-dom";

class Welcome extends Component {
    render() {
        return (
            <>
                <p className="logo2">G L A S S D O O R</p>
                <BrowserRouter>
                    <Route exact path="/">
                        <Registration />

                        <Link to="/login">
                            <p className="logLink">
                                ⍆ If already registered login here ⍅
                            </p>
                        </Link>
                    </Route>
                    <Route path="/login">
                        <Login />

                        <Link to="/">
                            <p className="logLink">
                                ⍆ or create an account here ⍅
                            </p>
                        </Link>
                        <Link to="/reset-password">
                            <p className="logLink">
                                ⍆ You forgot your password? Click here ⍅
                            </p>
                        </Link>
                    </Route>
                    <Route path="/reset-password">
                        <ResetPassword />
                    </Route>
                </BrowserRouter>
            </>
        );
    }
}

export default Welcome;
