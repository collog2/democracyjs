import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import authorize from "../middlewares/authorize.js";

var router = express.Router();

const users = [
	{
		id: 1,
		username: "admin",
		role: "ADMIN",
		password: "admin",
	},
	{
		id: 2,
		username: "user2",
		role: "VOTER",
		password: "user2",
	},
	{
		id: 3,
		username: "user3",
		role: "VOTER",
		password: "user3",
	},
];

/* GET home page. */
router.get("/", (req, res, next) => {
	return res.status(200).json({
		success: true,
		data: { message: "hello world!" },
	});
});

router.post("/login", (req, res) => {
	const { username, password } = req.body;

	let user;
	try {
		// query find user by username
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, data: { message: "server error" } });
	}

	if (!user) {
		return res.status(404).json({
			success: false,
			data: { message: "username doesn't exist." },
		});
	}

	if (!bcrypt.compareSync(password, user.password)) {
		return res
			.status(401)
			.json({ success: false, data: { message: "wrong password." } });
	}

	delete user.password;

	let token;
	try {
		token = jwt.sign(user, process.env.JWT_SECRET, {
			expiresIn: process.env.JWT_EXPIRES_IN,
		});
	} catch (error) {
		return res
			.status(500)
			.json({ success: false, data: { message: "server error" } });
	}

	return res.status(200).json({ success: true, data: { user, token } });
});

export default router;
