import React, { Component } from "react";
import Login from "./Login";
import Userpage from "./Userpage";

class Homepage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mode: "setup",
			username: "",
			password: "",
			user: null,
			loading: false,
		};
	}

	render() {
		return this.state.mode === "loggedin" ? (
			<Userpage user={this.state.user} />
		) : (
			<div className="homepage">
				<div className="title">
					<h1>
						Secure
						<br />
						Social
						<br />
						Media
					</h1>
				</div>
				<div className="login-main-section">
					{this.state.loading ? (
						"Loading"
					) : this.state.mode === "setup" ? (
						this.buttons
					) : (
						<Login
							mode={this.state.mode}
							username={this.state.username}
							password={this.state.password}
							handlePasswordChange={this.handlePasswordChange}
							handleUsernameChange={this.handleUsernameChange}
							submit={this.submit}
							error={this.state.error}
						/>
					)}
				</div>
			</div>
		);
	}

	handleUsernameChange = (event) => {
		this.setState({ username: event.target.value });
	};

	handlePasswordChange = (event) => {
		this.setState({ password: event.target.value });
	};

	submit = (event) => {
		event.preventDefault();
		if (this.state.username !== "" && this.state.password !== "") {
			this.setState({
				error: undefined,
				loading: true,
			});
			fetch(
				"http://localhost:3001/getUserPassword?username=" +
					this.state.username,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
				}
			)
				.then((res) => res.json())
				.then((data) => {
					if (this.state.mode === "Log in") {
						if (data.Password === this.state.password) {
							this.setState({
								user: this.state.username,
								username: "",
								password: "",
								mode: "loggedin",
								loading: false,
							});
						} else {
							this.setState({
								error: "Username or password incorrect.",
								loading: false,
							});
						}
					} else {
						if (data.Password) {
							this.setState({
								error: "Username taken.",
								loading: false,
							});
						} else {
							fetch(
								"http://localhost:3001/createUser?username=" +
									this.state.username +
									"&password=" +
									this.state.password,
								{
									method: "POST",
									headers: {
										"Content-Type": "application/json",
									},
								}
							).then(() => {
								this.setState({
									user: this.state.username,
									username: "",
									password: "",
									mode: "loggedin",
									loading: false,
								});
							});
						}
					}
				})
				.catch(console.log);
		}
	};

	buttons = (
		<div className="intro-box">
			<button
				className="login-button"
				onClick={() => {
					this.setState({ mode: "Log in" });
				}}
			>
				Log in
			</button>
			<button
				className="login-button"
				onClick={() => {
					this.setState({ mode: "Sign up" });
				}}
			>
				Sign up
			</button>
		</div>
	);
}

export default Homepage;
