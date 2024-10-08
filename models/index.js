import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";
import dotenv from "dotenv";
import userFactory from "./user.model.js";
import voteFactory from "./vote.model.js";
import planFactory from "./plan.model.js";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } =
	dotenv.config().parsed;

const sequelize = new Sequelize({
	dialect: MySqlDialect,
	database: DB_NAME,
	user: DB_USER,
	password: DB_PASSWORD,
	host: DB_HOST,
	port: +DB_PORT,
});

try {
	await sequelize.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

const User = userFactory(sequelize, Sequelize);
const Vote = voteFactory(sequelize, Sequelize);
const Plan = planFactory(sequelize, Sequelize);

User.hasMany(Vote, {
	foriegnKey: {
		allowNull: false,
	},
});
Vote.belongsTo(User);

Plan.hasMany(Vote, {
	foriegnKey: {
		allowNull: false,
	},
});
Vote.belongsTo(Plan);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.user = User;
db.plan = Plan;
db.vote = Vote;

export default db;
