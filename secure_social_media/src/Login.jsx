import React, { Component } from "react";

class Login extends Component {
	render() {
		return (
			<div className="login-box">
				<form onSubmit={this.props.submit}>
					<label>
						Username:
						<br />
						<input
							className="login-text-area"
							type="text"
							name="username"
							value={this.props.username}
							onChange={this.props.handleUsernameChange}
						/>
					</label>
					<br />
					<label>
						Password:
						<br />
						<input
							className="login-text-area"
							type="text"
							name="password"
							value={this.props.password}
							onChange={this.props.handlePasswordChange}
						/>
					</label>
					<br />
					<input type="submit" value={this.props.mode} />
				</form>
				{this.props.error ? <p>{this.props.error}</p> : null}
			</div>
		);
	}
}

export default Login;
