import dotenv from "dotenv";
import jwt, { JwtPayload } from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

dotenv.config();

interface AuthRequest extends Request {
  user?: string | JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.token;
    console.log(token);
  if (!token) {
    return res.status(401).json({ success: false, message: "No se encontró token" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    req.user = decoded; // Ahora TypeScript reconoce `req.user`
    next();
  } catch (error) {
    return res.status(401).json({ success: false, message: "No se pudo verificar el token" });
  }
};
