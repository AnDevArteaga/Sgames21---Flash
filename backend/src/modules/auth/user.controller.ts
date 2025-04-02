import { Request, Response } from "express";
import { UserService } from "./user.service";
import jwt from "jsonwebtoken";

export class UserController {
  static async register(req: Request, res: Response) {
    const { fullname, institution, username, password } = req.body;
    try {
      const response = await UserService.register(
        fullname,
        institution,
        username,
        password,
      );
      res.status(201).json(response);
    } catch (error: any) {
      res.status(500).json({ success: false, message: error.message });
    }
  }
  static async login(req: Request, res: Response) {
    const { username, password } = req.body;
    console.log(username, password);
    try {
      const response = await UserService.login(username, password);
      // Guardar el token en una cookie HTTP-only
      console.log('response', response);
      res.cookie("token", response.data.token, {
        httpOnly: true, // Evita que el frontend pueda acceder a la cookie
        secure: process.env.NODE_ENV === "production", // Solo en HTTPS en producción
        sameSite: "strict", // Protege contra ataques CSRF
        maxAge: 43200000, // 12 hora
      });
      res.status(200).json(response);
    } catch (error: any) {
      res.status(401).json({ success: false, message: error.message });
    }
  }

  // Verificar si un usuario existe por username
  static async checkUserExists(req: Request, res: Response) {
    const { username } = req.body;

    try {
      const response = await UserService.checkUserExists(username);
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
  // Cambiar contraseña por ID de usuario
  static async updatePassword(req: Request, res: Response) {
    const { id_usuario, newPassword } = req.body;
    console.log(id_usuario, newPassword);

    console.log(id_usuario, newPassword);
    try {
      const response = await UserService.updatePassword(
        id_usuario,
        newPassword,
      );
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }

  static async verifyToken(req: Request, res: Response) {
    const token = req.cookies.token;
    console.log('token');
    console.log(req.cookies);
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY as string);
      console.log(decoded, 'decoded');
      res.status(200).json({ success: true, message: "Token verificado", data: decoded });
    } catch (error: any) {
      res.status(401).json({ success: false, message: "No se pudo verificar el token" });
    }
  }

  static async logOut(req: Request, res: Response) {
    res.clearCookie("token");
    res.status(200).json({ success: true, message: "Sesión cerrada" });
  }

}
