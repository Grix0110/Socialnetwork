import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
// import Logo from "./logo";
import ProfilePic from "./profilePic";
import Profile from "./Profile";
import FindPeople from "./findPeople";
import OtherProfile from "./OtherProfile";
import FriendsAndWannabes from "./friendsAndWannabes";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPopupOpen: false,
            firstName: "",
            lastName: "",
            picture: "",
            bio: "",
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.changeName = this.changeName.bind(this);
    }

    componentDidMount() {
        fetch("./user")
            .then((result) => result.json())
            .then((data) => {
                this.setState({
                    firstName: data.first_name,
                    lastName: data.last_name,
                    picture: data.image_url,
                    bio: data.bio,
                });
            });
    }

    changeName(first, last) {
        this.setState({ firstName: first });
        this.setState({ lastName: last });
    }

    togglePopup() {
        this.setState({ isPopupOpen: !this.state.isPopupOpen });
    }

    render() {
        return (
            <div id="profileCon">
                {/* <Logo /> */}
                <BrowserRouter>
                    <nav className="navBar">
                        <p className="logo">G L A S S D O O R</p>
                        <a href="/" className="profilePic">
                            <ProfilePic
                                // togglePopup={this.togglePopup}
                                changeName={this.changeName}
                                firstName={this.state.firstName}
                                lastName={this.state.lastName}
                                picture={this.state.picture}
                            />
                        </a>
                        <div className="newFriendsLink">
                            <Link to="/new-people">
                                <p className="linkText">search</p>
                            </Link>
                        </div>
                        <div className="friendsLink">
                            <Link to="/friends">
                                <p className="linkText">friends</p>
                            </Link>
                        </div>
                    </nav>
                    <Route exact path="/">
                        <Profile
                            togglePopup={this.togglePopup}
                            picture={this.state.picture}
                            firstName={this.state.firstName}
                            lastName={this.state.lastName}
                            bio={this.state.bio}
                            saveDraft={this.saveDraftBioToApp}
                            uploadPicture={this.uploadPicture}
                            isPopupOpen={this.state.isPopupOpen}
                        />
                    </Route>
                    <Route path="/new-people">
                        <FindPeople />
                    </Route>
                    <Route path="/user/:id">
                        <OtherProfile />
                    </Route>
                    <Route path="/friends">
                        <FriendsAndWannabes />
                    </Route>
                </BrowserRouter>
            </div>
        );
    }
}
