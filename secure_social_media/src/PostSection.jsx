import React, { Component } from "react";
import "./Userpage.css";
const crypto = require("crypto");

class PostSection extends Component {
	init = async () => {
		const respose = await fetch(
			"http://localhost:3001/getPosts?username=" + this.props.user,
			{
				method: "GET",
				headers: { "Content-Type": "application/json" },
			}
		);
		const result = await respose.json();
		this.setState({ posts: result });
		result.forEach((post) => {
			this.decrypt(post);
		});
	};

	decrypt = async (post) => {
		try {
			const respose = await fetch(
				"http://localhost:3001/getPostKey?username=" +
					this.props.user +
					"&id=" +
					post.id,
				{
					method: "GET",
					headers: { "Content-Type": "application/json" },
				}
			);
			const result = await respose.json();
			let key = result[0].toString("hex");
			let decipher = crypto.createDecipher(this.algorithm, key);

			let decrypted = decipher.update(post.text, "hex", "utf8");
			decrypted += decipher.final("utf8");
			decrypted = decrypted.toString();

			post.text = decrypted;

			this.forceUpdate();
		} catch (e) {}
	};

	constructor(props) {
		super(props);
		this.state = {
			posts: null,
			postText: "",
		};
		this.init();
	}

	algorithm = "aes-128-cbc";

	handleChange = (event) => {
		this.setState({ postText: event.target.value });
	};

	handleSubmit = async (event) => {
		event.preventDefault();

		let key = crypto.randomBytes(16);
		key = key.toString("hex");
		console.log(key.length);

		const cipher = crypto.createCipher(this.algorithm, key);

		let encrypted = cipher.update(this.state.postText, "utf8", "hex");
		encrypted += cipher.final("hex");

		await fetch(
			"http://localhost:3001/post?author=" +
				this.props.user +
				"&id=" +
				Math.floor(Math.random() * 2147483647) +
				"&text=" +
				encrypted +
				"&key=" +
				key,
			{
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
			}
		);
		this.setState({ postText: "" });
		this.init();
	};

	getPostItems = () =>
		this.state.posts.map((post) => (
			<div className="post" key={post.id}>
				<h3>{post.author}</h3>
				<p>{post.text}</p>
			</div>
		));

	render() {
		return (
			<div className="post-section">
				<div className="feed">
					{this.state.posts ? this.getPostItems() : null}
				</div>
				<div className="post-input">
					<form
						className="post-input-form"
						onSubmit={this.handleSubmit}
					>
						<label>
							<input
								className="large-text-area"
								type="text"
								name="password"
								value={this.state.postText}
								onChange={this.handleChange}
							/>
						</label>
						<input
							className="user-add-button"
							type="submit"
							value="Post"
						/>
					</form>
				</div>
			</div>
		);
	}
}

export default PostSection;
