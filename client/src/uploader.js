import { Component } from "react";

export default class Uploader extends Component {
    constructor(props) {
        super(props);

        this.state = {
            picture: "",
        };
        this.uploadPicture = this.uploadPicture.bind(this);
    }

    componentDidMount() {
        console.log("uploader mounted!");
    }

    uploadPicture(e) {
        e.preventDefault();
        const form = e.currentTarget;
        const formData = new FormData(form);
        fetch("/update-pic", {
            method: "POST",
            body: formData,
        })
            .then((result) => result.json())
            .then((data) => {
                this.setState(data);
                location.reload();
            })
            .catch((err) => console.log("ERROR in FormSubmit: ", err));
    }

    render() {
        return (
            <div id="uploader">
                <div>Hi {this.props.firstName} change your Picture here!</div>
                <form
                    id="profilePicture"
                    onSubmit={this.uploadPicture}
                    method="post"
                >
                    <input
                        id="fileInput"
                        type="file"
                        name="profilePicture"
                        accept="image/*"
                    />
                    <input type="submit" id="submit" value="Upload" />
                </form>
            </div>
        );
    }
}
