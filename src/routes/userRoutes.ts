import express from "express";
import { authCheck } from "../middlewares/authVerification";
import { getContent, postContent } from "../controller/userController";
export const userrouter = express.Router();

userrouter.use(authCheck);

userrouter.route("/content").post(postContent).get(getContent);
