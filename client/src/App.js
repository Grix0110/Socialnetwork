import { Component } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
// import Logo from "./logo";
import ProfilePic from "./profilePic";
import Profile from "./Profile";
import FindPeople from "./findPeople";
import OtherProfile from "./OtherProfile";

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
                <nav className="navBar">
                    <ProfilePic
                        togglePopup={this.togglePopup}
                        changeName={this.changeName}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        picture={this.state.picture}
                    />
                </nav>
                <BrowserRouter>
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
                        <div className="profLink">
                            <Link to="/new-people">
                                <p>⍆ find new people here ⍅</p>
                            </Link>
                        </div>
                    </Route>
                    <Route path="/new-people">
                        <FindPeople />
                        <div className="profLink">
                            <Link to="/">
                                <p>⍆ your profile ⍅</p>
                            </Link>
                        </div>
                    </Route>
                    <Route path="/user/:id">
                        <OtherProfile />
                    </Route>
                </BrowserRouter>
            </div>
        );
    }
}