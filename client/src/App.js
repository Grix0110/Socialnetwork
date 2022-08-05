import { Component } from "react";
// import Logo from "./logo";
import ProfilePic from "./profilePic";
import Uploader from "./uploader";

export default class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isPopupOpen: false,
            username: "Buckwheat",
        };
        this.togglePopup = this.togglePopup.bind(this);
        this.changeName = this.changeName.bind(this);
    }

    componentDidMount() {
        console.log("Component Mounted");
        // fetch informartion from the server
    }

    changeName(newName) {
        this.setState({ username: newName });
    }

    togglePopup() {
        this.setState({ isPopupOpen: !this.state.isPopupOpen });
    }

    render() {
        return (
            <div>
                {/* <Logo /> */}
                
                <ProfilePic
                    togglePopup={this.togglePopup}
                    changeName={this.changeName}
                />
                {this.state.isPopupOpen && (
                    <Uploader username={this.state.username} />
                )}
                <h1>Hello from App</h1>
            </div>
        );
    }
}
