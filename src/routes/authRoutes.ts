import express from "express";
import { getUser, signin, signup } from "../controller/authController";

export const authrouter = express.Router();

authrouter.route("/signup").post(signup);

authrouter.route("/signin").post(signin);

authrouter.route("/getUser").get(getUser);
