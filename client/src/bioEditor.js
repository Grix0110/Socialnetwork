import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { draftBio: "", isEditorVisible: false, bio: props.bio };
        this.showEditor = this.showEditor.bind(this);
        this.onFormInputChange = this.onFormInputChange.bind(this);
        this.fetchNewBioToServer = this.fetchNewBioToServer.bind(this);
    }

    showEditor() {
        this.setState({ isEditorVisible: !this.state.isEditorVisible });
    }

    onFormInputChange(e) {
        const target = e.currentTarget;
        this.setState({
            [target.name]: target.value,
        });
    }

    fetchNewBioToServer() {
        this.showEditor();
        const userData = { bio: this.state.bio };
        fetch("/updateBio", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((result) => result.json())
            .then((data) => {
                this.setState(data);
                location.reload();
            });
    }

    render() {
        return (
            <section id="bio">
                {this.state.isEditorVisible ? (
                    <>
                        <textarea
                            id="bioText"
                            name="bio"
                            cols="30"
                            rows="10"
                            onChange={this.onFormInputChange}
                        >{this.props.bio}</textarea>
                        <button
                            onClick={
                                (this.showEditor, this.fetchNewBioToServer)
                            }
                        >
                            Save
                        </button>
                    </>
                ) : (
                    <>
                        {this.props.bio ? (
                            <>
                                <h3 className="bioRender">{this.props.bio}</h3>
                                <button onClick={this.showEditor}>Edit</button>
                            </>
                        ) : (
                            <button onClick={this.showEditor}>Add</button>
                        )}
                    </>
                )}
            </section>
        );
    }
}
