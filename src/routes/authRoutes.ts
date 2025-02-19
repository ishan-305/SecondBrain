import express from "express";
import { signin, signup } from "../controller/authController";

export const authrouter = express.Router();

authrouter.route("/signup").post(signup);

authrouter.route("/signin").post(signin);
