import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import random from "../utils/random";

const prisma = new PrismaClient();

export const createLink = async (req: Request, res: Response) => {
  const share = req.body.share;
  if (share) {
    const existingLink = await prisma.link.findFirst({
      where: {
        user_id_Link: Number(req.userId),
      },
    });

    if (existingLink) {
      res.json({
        hash: existingLink.hash,
      });
      return;
    }

    const hash = random(10);
    const link = await prisma.link.create({
      data: {
        hash,
        user_id_Link: Number(req.userId),
      },
    });

    res.json({ hash });
  } else {
    const Link = await prisma.link.delete({
      where: {
        user_id_Link: Number(req.userId),
        id: req.body.id,
      },
    });
  }
};
