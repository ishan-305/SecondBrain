import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const postContent = async (req: Request, res: Response) => {
  const { link, title, type, tags } = req.body; // expecting tags to be an array of strings (Validate using Zod)

  try {
    const data: any = {
      link,
      title,
      type,
      user_id: req.userId,
    };

    // If tags is provided and has at least one value, create the tag.
    if (tags && Array.isArray(tags) && tags.length > 0) {
      data.tags = {
        create: {
          title: tags[0],
        },
      };
    }

    const content = await prisma.content.create({ data });

    res.status(201).json(content);
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getContent = async (req: Request, res: Response) => {
  try {
    const content = await prisma.content.findMany({
      where: {
        user_id: Number(req.userId),
      },
    });

    res.status(200).json({
      content,
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteContent = async (req: Request, res: Response) => {
  const contentId = req.body.id;
  try {
    await prisma.content.delete({
      where: {
        id: contentId,
        user_id: Number(req.userId),
      },
    });

    res.status(200).json({
      message: "Content deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};
