import { Component } from "react";
import { Link } from "react-router-dom";

export default class ResetPassword extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            code: "",
            message: "",
            view: 1,
        };
        this.currentView = this.currentView.bind(this);
        this.onFormInputChange = this.onFormInputChange.bind(this);
        this.checkUserAndSendCode = this.checkUserAndSendCode.bind(this);
        this.checkCodeAndUpdate = this.checkCodeAndUpdate.bind(this);
    }

    onFormInputChange(e) {
        const target = e.currentTarget;
        this.setState({
            [target.name]: target.value,
        });
    }

    checkUserAndSendCode(e) {
        e.preventDefault();

        const userData = {
            email: this.state.email,
        };

        fetch("/sendingCode", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((result) => result.json())
            .then((data) => {
                console.log(data);
                if (data.success == true) {
                    this.setState({ view: 2, message: data.message });
                } else {
                    this.setState({ message: data.message });
                }
            })
            .catch((err) => console.log("ERROR in FormSubmit: ", err));
    }

    checkCodeAndUpdate(e) {
        e.preventDefault();

        const userData = {
            code: this.state.code,
            password: this.state.password,
        };

        fetch("/resetPassword", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((result) => result.json())
            .then((data) => {
                console.log(data);
                if (data.success == true) {
                    this.setState({ view: 3, message: data.message });
                } else {
                    this.setState({ message: data.message });
                }
            })
            .catch((err) => console.log("ERROR in FormSubmit: ", err));
    }

    currentView() {
        if (this.state.view === 1) {
            return (
                <>
                    <p>{this.state.message}</p>
                    <form onSubmit={this.checkUserAndSendCode}>
                        <label htmlFor="email"></label>
                        <input
                            type="email"
                            name="email"
                            placeholder="email"
                            onChange={this.onFormInputChange}
                            // required
                        ></input>
                        <input type="submit" id="submit"></input>
                        <Link to="/login">
                            <div>
                                <span>Click here to go back to Log in!</span>
                            </div>
                        </Link>
                    </form>
                </>
            );
        } else if (this.state.view === 2) {
            return (
                <>
                    <p>{this.state.message}</p>
                    <form onSubmit={this.checkCodeAndUpdate}>
                        <label htmlFor="code"></label>
                        <input
                            type="text"
                            name="code"
                            placeholder="code"
                            onChange={this.onFormInputChange}
                            // required
                        ></input>
                        <label htmlFor="newPassword"></label>
                        <input
                            type="password"
                            name="password"
                            placeholder="new password"
                            onChange={this.onFormInputChange}
                            // required
                        ></input>
                        <input type="submit" id="submit"></input>
                        <Link to="/login">
                            <div>
                                <span>Click here to go back to Log in!</span>
                            </div>
                        </Link>
                    </form>
                </>
            );
        } else if (this.state.view === 3) {
            return (
                <section>
                    <h1>{this.state.message}</h1>
                    <Link to="/login">
                        <div>
                            <span>Click here to go back to Log in!</span>
                        </div>
                    </Link>
                </section>
            );
        } else {
            return <div></div>;
        }
    }

    render() {
        return <div>{this.currentView()}</div>;
    }
}
