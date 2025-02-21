import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import jwt, { JwtPayload } from "jsonwebtoken";
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
      message: "Success",
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

export const getUser = async (req: Request, res: Response) => {
  const token = req.cookies?.authToken;
  if (!token) {
    res.status(401).json({ message: "Unauthorized: No token provided" });
    return;
  }
  const decoded = jwt.verify(token as string, JWT_SECRET_KEY);
  if (decoded) {
    if (typeof decoded === "string") {
      res.status(403).json({
        message: "You are not logged in",
      });
      return;
    }
    req.userId = (decoded as JwtPayload).id;
  } else {
    res.status(403).json({
      message: "You are not logged in",
    });
  }
};
