import { UserRepository } from "./user.repository";
import { AntesDeRepository } from "../phase_one/antesDe/antesDe.repository";
import { Meta } from "../../interfaces/meta.interface";
import jwt from "jsonwebtoken";

export class UserService {
  static async register(fullname: string, institution: string, username: string, password: string): Promise<Meta> {
    console.log(fullname, institution, username, password);
    if (!fullname || !institution || !username || !password) {
      throw new Error("Todos los campos son obligatorios");
    }

    try {
      const newUser = await UserRepository.registerUser(fullname, institution, username, password);
      console.log(newUser, 'newUser')
      await AntesDeRepository.createInfoStageStudent(newUser.id_usuario);
      await AntesDeRepository.createStrategyStudent(newUser.id_usuario);
      await AntesDeRepository.createInfoPhaseStudent(newUser.id_usuario, 'Fase 1 - Análisis de la información', 'Identificación de hechos relevantes', 'Identificación de opiniones y argumentos', 'Se analizan los datos disponibles para distinguir entre hechos objetivos y opiniones', 0);
      await AntesDeRepository.createProgressActivity(newUser.id_usuario);
      
      return {
        success: true,
        message: "Usuario registrado correctamente",
        data: newUser,
      };
    } catch (error: any) {
      throw new Error("Error al registrar el usuario: " + error.message);
    }
  }

  static async login(username: string, password: string): Promise<Meta> {
    if (!username || !password) {
      throw new Error("Usuario y contraseña son obligatorios");
    }

    try {
      const user = await UserRepository.loginUser(username, password);
      if (!user) {
        throw new Error("Credenciales incorrectas");
      }
      console.log(user);
      const token = jwt.sign({ id_usuario: user.id_usuario, nombre_completo: user.nombre_completo, institucion: user.institucion, nombre_usuario: user.nombre_usuario }, process.env.SECRET_KEY as string, {
        expiresIn: "1d",
      });
      return {
        success: true,
        message: "Login exitoso",
        data: { token: token },
      };
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  static async checkUserExists(username: string): Promise<Meta> {
    if (!username) {
      throw new Error("El nombre de usuario es obligatorio");
    }

    try {
      const user = await UserRepository.findUserByUsername(username);
      return {
        success: user ? true : false,
        message: user ? "El usuario existe" : "El usuario no existe",
        data: { ...user },
      };
    } catch (error: any) {
      throw new Error("Error al buscar el usuario: " + error.message);
    }
  }

   // Actualiza la contraseña de un usuario por ID
   static async updatePassword(userId: number, newPassword: string): Promise<Meta> {
    if (!userId || !newPassword) {
      throw new Error("El ID de usuario y la nueva contraseña son obligatorios");
    }

    try {
      const updated = await UserRepository.updatePassword(userId, newPassword);
      if (!updated) {
        throw new Error("No se pudo actualizar la contraseña");
      }

      return {
        success: true,
        message: "Contraseña actualizada correctamente",
      };
    } catch (error: any) {
      throw new Error("Error al actualizar la contraseña: " + error.message);
    }
  }

  
}
