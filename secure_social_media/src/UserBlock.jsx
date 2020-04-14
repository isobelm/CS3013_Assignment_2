import React, { Component } from "react";
import UserItem from "./UserItem.jsx";

class UserBlock extends Component {
	init = async () => {
		const data = await this.props.getData(this.props.user);
		this.setState({ users: data });
	};

	constructor(props) {
		super(props);
		this.state = { users: null, add: "" };
		this.addURL = this.props.addURL.bind(this);
		this.init();
	}

	handleChange = (event) => {
		this.setState({ add: event.target.value });
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		await fetch(this.addURL(this.props.user, this.state.add), {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
		});
		this.setState({ add: "" });
		this.init();
	};

	userItems = () =>
		this.state.users.map((user) => (
			<UserItem
				name={user}
				actionName="Remove"
				user={this.props.user}
				key={user}
				onClick={this.props.remove}
				refresh={this.init}
			/>
		));

	render() {
		return (
			<div className="user-block">
				<div className="list-title">{this.props.title}</div>
				<div className="user-list">
					{this.state.users != null ? this.userItems() : null}
				</div>
				<form className="user-add-form" onSubmit={this.handleSubmit}>
					<label>
						<input
							className="small-text-area"
							type="text"
							name="password"
							value={this.state.add}
							onChange={this.handleChange}
						/>
					</label>
					<input
						className="user-add-button"
						type="submit"
						value="Add"
					/>
				</form>
			</div>
		);
	}
}

export default UserBlock;
