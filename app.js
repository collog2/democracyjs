import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";
import { Sequelize } from "@sequelize/core";
import { MySqlDialect } from "@sequelize/mysql";

dotenv.config({ path: "/.env" });

import indexRouter from "./routes/index.js";
import usersRouter from "./routes/users.js";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./public"));

app.use("/", indexRouter);
app.use("/users", usersRouter);

const sequelize = new Sequelize({
	dialect: MySqlDialect,
	database: "democracyjs",
	user: "root",
	password: "r#Mz3mysql",
	host: "localhost",
	port: 3306,
});

try {
	await sequelize.authenticate();
	console.log("Connection has been established successfully.");
} catch (error) {
	console.error("Unable to connect to the database:", error);
}

export default app;
