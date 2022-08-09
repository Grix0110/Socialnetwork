import { Component } from "react";
// import Logo from "./logo";
import ProfilePic from "./profilePic";
import Profile from "./Profile";
// import Uploader from "./uploader";


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
        this.saveDraftBioToApp = this.saveDraftBioToApp.bind(this);
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

    saveDraftBioToApp(bio) {
        console.log(this.state.bio);
        this.setState({ bio: bio });
    }

    render() {
        return (
            <div id="profileCon">
                {/* <Logo /> */}
                <ProfilePic
                    togglePopup={this.togglePopup}
                    // changeName={this.changeName}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    picture={this.state.picture}
                />
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
            </div>
        );
    }
}
