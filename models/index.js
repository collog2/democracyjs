import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";

const { DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT } = process.env;

const sequelize = new Sequelize({
	dialect: MySqlDialect,
	database: DB_NAME,
	user: DB_USER,
	password: DB_PASSWORD,
	host: DB_HOST,
	port: DB_PORT,
});

try {
	await sequelize.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
