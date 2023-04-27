import { Request, Response, NextFunction } from "express";
import mime from "mime-types";

const imageValidator = (req: Request, res: Response, next: NextFunction) => {
  const imageString = req.body.image;
  if (typeof imageString === "string") {
    const prefixRegex = /^data:image\/([A-Za-z]+);base64,/;
    const match = imageString.match(prefixRegex);
    if (match) {
      const mimeType = match[1];
      const lookupResult = mime.lookup(mimeType);
      if (!lookupResult || !lookupResult.startsWith("image/")) {
        res
          .status(400)
          .json(
            "Image should be a base64-encoded image of type PNG, JPEG or GIF!"
          );
      } else next();
    } else res.status(400).json("Image should be a base64-encoded image!");
  } else res.status(400).json("Image should be a base64-encoded image!");
};

const updateNameValidator = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const nameLength = req.body.name.length;
  if (nameLength > 3 && nameLength < 17) {
    next();
  } else res.status(400).json("Name should have between 4 and 16 characters!");
};

export { updateNameValidator, imageValidator };
