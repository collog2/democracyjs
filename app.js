import express from "express";
import cookieParser from "cookie-parser";
import logger from "morgan";
import dotenv from "dotenv";

dotenv.config({ path: "/.env" });

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

export default app;
