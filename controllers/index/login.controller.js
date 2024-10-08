import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import db from "../../models/index.js";
const { JWT_SECRET, JWT_EXPIRES_IN } = dotenv.config().parsed;
const User = db.user;

const loginController = async (req, res) => {
	const { username, password } = req.body;
	if (!username || !password) {
		return res.status(400).json({
			success: false,
			data: { message: "Provide all of the inputs." },
		});
	}

	let user;
	try {
		user = await User.findOne({ where: { username }, raw: true });
	} catch (error) {
		console.error(error);
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
		token = jwt.sign(user, JWT_SECRET, {
			expiresIn: JWT_EXPIRES_IN,
		});
	} catch (error) {
		console.error(error);
		return res
			.status(500)
			.json({ success: false, data: { message: "server error" } });
	}

	return res.status(200).json({ success: true, data: { user, token } });
};

export default loginController;
