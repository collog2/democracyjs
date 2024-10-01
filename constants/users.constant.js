import bcrypt from "bcryptjs";
import dotenv from "dotenv";

const saltRounds = dotenv.config().parsed.BC_SALT_ROUNDS;
const salt = bcrypt.genSaltSync(+saltRounds);

const users = [
	{
		username: "admin",
		role: "ADMIN",
		password: bcrypt.hashSync("admin", salt),
	},
	{
		username: "user1",
		role: "VOTER",
		password: bcrypt.hashSync("user1", salt),
	},
	{
		username: "user2",
		role: "VOTER",
		password: bcrypt.hashSync("user2", salt),
	},
	{
		username: "user3",
		role: "VOTER",
		password: bcrypt.hashSync("user3", salt),
	},
	{
		username: "user4",
		role: "VOTER",
		password: bcrypt.hashSync("user4", salt),
	},
	{
		username: "user5",
		role: "VOTER",
		password: bcrypt.hashSync("user5", salt),
	},
	{
		username: "user6",
		role: "VOTER",
		password: bcrypt.hashSync("user6", salt),
	},
];

export default users;
