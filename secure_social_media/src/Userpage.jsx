import React, { Component } from "react";
import "./Userpage.css";
import UserBlock from "./UserBlock";
import PostSection from "./PostSection";

class Userpage extends Component {
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
		return (
			<div className="userpage">
				<div className="header">
					<h2>Secure Social Media</h2>
				</div>
				<div className="user-main-section">
					<PostSection user={this.props.user} />
					<div className="sidebar">
						<UserBlock
							getData={this.getFollowing}
							title={"Following"}
							user={this.props.user}
							remove={this.removeFollower}
							addURL={this.addFollowingURL}
						/>
						<UserBlock
							getData={this.getCanDecrypt}
							title={"Decrypt Group"}
							user={this.props.user}
							remove={this.removeDecryptPermissions}
							addURL={this.addDecryptPermissionsURL}
						/>
					</div>
				</div>
			</div>
		);
	}
}

export default Userpage;
