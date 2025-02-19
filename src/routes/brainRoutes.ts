import express from "express";
import { authCheck } from "../middlewares/authVerification";
import { createLink } from "../controller/brainController";

export const brainRouter = express.Router();

brainRouter.use(authCheck);

brainRouter.route("/share").post(createLink);
