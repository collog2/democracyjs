import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const loginController = (req, res) => {
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
};

export default loginController;
