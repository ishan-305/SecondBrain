import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config";
const prisma = new PrismaClient();

export const signup = async (req: Request, res: Response) => {
  //TODD: ZOD validation , Hashing password
  //@ts-ignore
  const { username, password } = req.body;
  try {
    const user = await prisma.users.create({
      data: {
        username,
        password,
      },
    });
    res.status(201).json({
      message: "SignUp Successfull",
    });
  } catch (error) {
    console.log(error);
    res.status(411).json({
      message: "User already exists",
    });
  }
};

export const signin = async (req: Request, res: Response) => {
  const { username, password } = req.body;

  const existingUser = await prisma.users.findUnique({
    where: {
      username,
      password,
    },
  });

  if (existingUser) {
    const token = jwt.sign({ id: existingUser.id }, JWT_SECRET_KEY);

    res.json({ token });
  } else {
    res.status(403).json({
      message: "Invalid username or password",
    });
  }
};
