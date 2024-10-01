import express from "express";
import loginController from "../controllers/index/login.controller.js";
import indexController from "../controllers/index/index.controller.js";

var router = express.Router();

router.get("/", indexController);

router.post("/login", loginController);

export default router;
