import React, { Component } from "react";
import "./Userpage.css";
import UserBlock from "./UserBlock";

class PostSection extends Component {
	// constructor(props) {
	// 	super(props);
	// 	this.state = {
	// 		mode: "setup",
	// 		username: "",
	// 		password: "",
	// 		user: null,
	// 	};
	// }

	getFollowing = async () => {
		const following = await fetch(
			"http://localhost:3001/getFollowing?username=" + this.props.user,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);
		const result = await following.json();
		return result;
	};

	getCanDecrypt = async () => {
		const decryptGroup = await fetch(
			"http://localhost:3001/getDecryptGroup?username=" + this.props.user,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);
		const result = await decryptGroup.json();
		return result;
	};

	async removeFollower() {
		await fetch(
			"http://localhost:3001/removeFollower?user=" +
				this.props.name +
				"&follower=" +
				this.props.user,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		this.props.refresh();
	}

	async removeDecryptPermissions() {
		await fetch(
			"http://localhost:3001/removeDecryptPermissions?user=" +
				this.props.name +
				"&postsBy=" +
				this.props.user,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		this.props.refresh();
	}

	addDecryptPermissionsURL() {
		return (
			"http://localhost:3001/addDecryptPermissions?user=" +
			this.state.add +
			"&postsBy=" +
			this.props.user
		);
	}

	addFollowingURL() {
		return (
			"http://localhost:3001/addFollowing?user=" +
			this.state.add +
			"&follower=" +
			this.props.user
		);
	}

	render() {
		return <div className="post-section"></div>;
	}
}

export default PostSection;
