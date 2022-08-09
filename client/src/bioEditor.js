import { Component } from "react";

export default class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { draftBio: "", isEditorVisible: false, bio: props.bio };
        this.showEditor = this.showEditor.bind(this);
        this.onFormInputChange = this.onFormInputChange.bind(this);
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
        const userData = { bio: this.state.bio };
        fetch("./updateBio", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((result) => result.json())
            .then((data) => {
                console.log(data);
            });

        this.showEditor();
        this.props.saveDraftBioToApp(this.state.draftBio);
    }

    render() {
        return (
            <section id="bio">
                {this.state.isEditorVisible ? (
                    <>
                        <textarea
                            id="bioText"
                            name="draftBio"
                            cols="30"
                            rows="10"
                            onChange={this.onFormInputChange}
                        ></textarea>
                        <button onClick={this.showEditor}>Cancel</button>
                    </>
                ) : (
                    <>
                        {this.props.bio ? (
                            <>
                                <h2>{this.props.bio}</h2>
                                <button>Edit</button>
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
