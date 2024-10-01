import express from "express";
import createPlanController from "../controllers/plan/create.controller.js";
import authorize from "../middlewares/authorize.js";
import isAdmin from "../middlewares/isAdmin.js";
import isVoter from "../middlewares/isVoter.js";
import voteController from "../controllers/plan/vote.controller.js";
import resultController from "../controllers/plan/result.controller.js";

var router = express.Router();

router.put("/", authorize, isAdmin, createPlanController);

router.post("/:planId/vote", authorize, isVoter, voteController);

router.get("/:planId/result", authorize, isAdmin, resultController);

export default router;
