import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_USER_SECRET;

export function auth(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  try {
    const decodedData = jwt.verify(token, JWT_SECRET!) as any;

    if (decodedData) {
      req.userId = decodedData.id;
      next();
    } else {
      res.status(403).json({
        message: "You are not signed in",
      });
    }
  } catch (e) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}
