import { Component } from "react";
// import Logo from "./logo";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";
import BioEditor from "./bioEditor";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPopupOpen: false,
            firstName: "",
            lastName: "",
            picture: "",
            bio: "some bio",
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

    setBio(bio) {
        this.setState({ bio: bio });
    }

    render() {
        return (
            <div id="profileCon">
                {/* <Logo /> */}
                <h1 id="usernameBig">
                    {this.state.firstName} {this.state.lastName}
                </h1>
                <img id="miniPic" src={this.state.picture} alt={this.state.firstName}></img>
                <ProfilePic
                    togglePopup={this.togglePopup}
                    // changeName={this.changeName}
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    picture={this.state.picture}
                />
                {this.state.isPopupOpen && (
                    <Uploader
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        uploadPicture={this.uploadPicture}
                    />
                )}
                <BioEditor bio={this.state.bio} />
            </div>
        );
    }
}
