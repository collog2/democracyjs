import express from "express";
import createPlanController from "../controllers/plan/create.controller.js";
import authorize from "../middlewares/authorize.js";
import isAdmin from "../middlewares/isAdmin.js";

var router = express.Router();

router.put("/", authorize, isAdmin, createPlanController);

export default router;
