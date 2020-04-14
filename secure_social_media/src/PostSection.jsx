import React, { Component } from "react";
import "./Userpage.css";

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
		debugger;
		this.setState({ posts: result });
	};

	constructor(props) {
		super(props);
		this.state = {
			posts: null,
			postText: "",
		};
		this.init();
	}

	handleChange = (event) => {
		this.setState({ postText: event.target.value });
	};

	handleSubmit = async (event) => {
		event.preventDefault();
		await fetch(
			"http://localhost:3001/post?author=" +
				this.props.user +
				"&id=" +
				Math.floor(Math.random() * 2147483647) +
				"&text=" +
				this.state.postText,
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
			<div className="post">
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
