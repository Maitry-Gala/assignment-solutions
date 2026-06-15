import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";

const JWT_SECRET = process.env.JWT_USER_SECRET;

export function auth(req: Request, res: Response, next: NextFunction) {
  const parts = req.headers.authorization;

  if (!parts) {
    return res.status(401).json({
      message: "No token provided",
    });
  }
  const authHeader = parts.split(" ");
  if (authHeader.length !== 2 || authHeader[0] !== "Bearer") {
    res.status(401).json({ error: "Token format must be Bearer <token>" });
    return;
  }

  const token = authHeader[1];
  console.log(token);
  
  try {
    const decodedData = jwt.verify(token!, process.env.JWT_USER_SECRET!) as any;

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
