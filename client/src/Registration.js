import { Component } from "react";

class Registration extends Component {
    constructor() {
        super();

        this.state = {
            isUserLoggedIn: false,
        };
        this.state = {
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            message: "",
        };
        this.onFormInputChange = this.onFormInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    logInUser() {
        this.setState({
            isUserLoggedIn: true,
        });
    }

    onFormInputChange(e) {
        const target = e.currentTarget;
        this.setState({
            [target.name]: target.value,
        });
    }

    onFormSubmit(e) {
        e.preventDefault();
        const userData = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
        };
        fetch("/register", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((result) => result.json())
            .then((data) => {
                console.log(data);
                if (!data.success && data.message) {
                    this.setState({ message: data.message });
                } else {
                    location.reload();
                }
            })
            .catch((err) => console.log("ERROR in FormSubmit: ", err));
    }

    render() {
        return (
            <>
                <h1>Registration</h1>
                <p>{this.state.message}</p>
                <form id="registration" onSubmit={this.onFormSubmit}>
                    <label htmlFor="firstName"></label>
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={this.onFormInputChange}
                        // required
                    ></input>
                    <label htmlFor="lastName"></label>
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={this.onFormInputChange}
                        // required
                    ></input>
                    <label htmlFor="email"></label>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={this.onFormInputChange}
                        // required
                    ></input>
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={this.onFormInputChange}
                        // required
                    ></input>
                    <input type="submit" id="submit"></input>
                </form>
            </>
        );
    }
}

export default Registration;
