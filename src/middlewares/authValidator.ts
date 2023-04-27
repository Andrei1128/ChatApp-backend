import { Request, Response, NextFunction } from "express";

const registerValidator = (req: Request, res: Response, next: NextFunction) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(req.body.email)) {
    const nameLength = req.body.name.length;
    if (nameLength > 3 && nameLength < 17) {
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8}$/;
      if (passwordRegex.test(req.body.password)) {
        next();
      } else res.status(400).json("Invalid password!");
    } else res.status(400).json("Invalid username!");
  } else res.status(400).json("Invalid email!");
};

export { registerValidator };
