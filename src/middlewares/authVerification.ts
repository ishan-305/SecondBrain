import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../config/config";
export const authCheck = (req: Request, res: Response, next: NextFunction) => {
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
    next();
  } else {
    res.status(403).json({
      message: "You are not logged in",
    });
  }
};
