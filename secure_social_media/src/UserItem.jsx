import React, { Component } from "react";

class UserItem extends Component {
	constructor(props) {
		super(props);
		this.onClick = this.props.onClick.bind(this);
	}

	render() {
		return (
			<div className="user-item">
				<div className="user-name">{this.props.name}</div>
				<button className="user-item-button" onClick={this.onClick}>
					{this.props.actionName}
				</button>
			</div>
		);
	}
}

export default UserItem;
