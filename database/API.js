const net = require("net");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql");

const api = express();
const apiPort = 3001;

api.use(cors());
api.use(bodyParser.urlencoded({ extended: false }));
api.use(bodyParser.json());

const con = mysql.createConnection({
	host: "localhost",
	user: "secure_social_user",
	password: "1234",
	database: "secure_social_db",
});

con.connect(function (err) {
	if (err) throw err;
	console.log("Connected!");
});

api.get("/getUserPassword", (req, res) => {
	const username = req.query.username;
	con.query(
		"SELECT Password FROM Users WHERE Username = '" + username + "'",
		function (err, result, fields) {
			if (err) {
				console.log("query error");
			} else {
				if (result.length >= 1) {
					res.status(200).send(result[0]);
				} else res.status(200).send(result);
			}
		}
	);
});

api.get("/getFollowing", (req, res) => {
	const username = req.query.username;
	con.query(
		"SELECT Following FROM Follows WHERE Follower = '" + username + "'",
		function (err, result, fields) {
			if (err) {
				console.log("query error");
			} else {
				const followers = result.map((entry) => entry.Following);
				res.status(200).send(followers);
			}
		}
	);
});

api.get("/getDecryptGroup", (req, res) => {
	const username = req.query.username;
	con.query(
		"SELECT User FROM CanDecrypt WHERE PostsBy = '" + username + "'",
		function (err, result, fields) {
			if (err) {
				console.log("query error");
			} else {
				const users = result.map((entry) => entry.User);
				res.status(200).send(users);
			}
		}
	);
});

api.post("/createUser", (req, res) => {
	const username = req.query.username;
	const password = req.query.password;
	console.log(username);
	con.query(
		"INSERT INTO Users VALUES ('" + username + "', '" + password + "')",
		function (err, result, fields) {
			if (err) {
				console.log("query error");
			} else {
				console.log(result);
				res.status(200).send();
			}
		}
	);
});

api.post("/removeFollower", (req, res) => {
	const user = req.query.user;
	const follower = req.query.follower;
	con.query(
		"DELETE FROM Follows WHERE Follower='" +
			follower +
			"' AND Following='" +
			user +
			"'",
		function (err, result, fields) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.status(200).send();
			}
		}
	);
});

api.post("/removeDecryptPermissions", (req, res) => {
	const user = req.query.user;
	const postsBy = req.query.postsBy;
	con.query(
		"DELETE FROM CanDecrypt WHERE PostsBy='" +
			postsBy +
			"' AND User='" +
			user +
			"'",
		function (err, result, fields) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.status(200).send();
			}
		}
	);
});

api.post("/addFollowing", (req, res) => {
	const user = req.query.user;
	const follower = req.query.follower;
	con.query(
		"INSERT INTO Follows VALUES ('" + follower + "', '" + user + "')",
		function (err, result, fields) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.status(200).send();
			}
		}
	);
});

api.post("/addDecryptPermissions", (req, res) => {
	const user = req.query.user;
	const postsBy = req.query.postsBy;
	con.query(
		"INSERT INTO CanDecrypt VALUES ('" + user + "', '" + postsBy + "')",
		function (err, result, fields) {
			if (err) {
				console.log(err);
			} else {
				console.log(result);
				res.status(200).send();
			}
		}
	);
});

api.listen(apiPort);
