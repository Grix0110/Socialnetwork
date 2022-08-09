import { Component } from "react";

class Login extends Component {
    constructor() {
        super();

        this.state = {
            isUserLoggedIn: false,
        };
        this.state = {
            email: "",
            password: "",
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
            email: this.state.email,
            password: this.state.password,
        };
        fetch("/login", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        })
            .then((result) => result.json())
            .then((data) => {
                if (data.success == true) {
                    location.href = "/";
                } else {
                    this.setState({
                        message: data.message,
                    });
                }
            })
            .catch((err) => console.log("ERROR in FormSubmit: ", err));
    }

    render() {
        return (
            <>
                <h1>Login</h1>
                <p>{this.state.message}</p>
                <form id="login" onSubmit={this.onFormSubmit}>
                    <label htmlFor="email"></label>
                    <input
                        type="email"
                        name="email"
                        placeholder="email"
                        onChange={this.onFormInputChange}
                        required
                    ></input>
                    <label htmlFor="password"></label>
                    <input
                        type="password"
                        name="password"
                        placeholder="password"
                        onChange={this.onFormInputChange}
                        required
                    ></input>
                    <input id="submit" type="submit"></input>
                </form>
            </>
        );
    }
}

export default Login;
