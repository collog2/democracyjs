import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";

dotenv.config();

import indexRouter from "./routes/index.js";
import plansRouter from "./routes/plan.js";

var app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static("./public"));

app.use("/", indexRouter);
app.use("/plan", plansRouter);

import db from "./models/index.js";
import defaultUsers from "./constants/users.constant.js";
const User = db.user;

db.sequelize
	.sync({ alter: true })
	.then(async () => {
		console.log("Synced db.");
		const existingUsers = await User.findAll();
		if (!existingUsers.length) {
			await User.bulkCreate(defaultUsers);
		}
	})
	.catch((err) => {
		console.log("Failed to sync db: " + err.message);
	});

export default app;
