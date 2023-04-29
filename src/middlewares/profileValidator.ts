import { Request, Response, NextFunction } from "express";
import { Buffer } from "buffer";
import { Image } from "canvas";

const imageValidator = (req: Request, res: Response, next: NextFunction) => {
  const data = req.body.image;
  const regex = /^data:image\/([\w/+\-.,]+);base64,/;
  const match = data.match(regex);
  if (!match) {
    res.status(400).json("Invalid image data");
    return;
  }
  const base64Data = data.replace(/^data:image\/\w+;base64,/, "");
  const buffer = Buffer.from(base64Data, "base64");
  const img = new Image();
  img.onerror = () => {
    res.status(400).json("Invalid image data");
    return;
  };
  img.onload = () => {
    req.body.imageBuffer = buffer;
    next();
  };
  img.src = "data:image/png;base64," + base64Data;
};

const updateNameValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (req.body.name) {
    const nameLength = req.body.name.length;
    if (nameLength > 3 && nameLength < 17) {
      next();
    } else
      res.status(400).json("Name should have between 4 and 16 characters!");
  } else next();
};

export { updateNameValidator, imageValidator };
