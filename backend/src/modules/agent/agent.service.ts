import { AgentRepository } from "./agent.repository";
import { Meta } from "../../interfaces/meta.interface";

export class AgentService {
  static async getMessage(key: string): Promise<Meta> {
    try {
      const message = await AgentRepository.getMessage(key);
      if (!message) {
        throw new Error("No se pudo obtener el mensaje");
      }
      return {
        success: true,
        message: "Mensaje obtenido correctamente",
        data: message,
      };
    } catch (error: any) {
      throw new Error("Error al obtener el mensaje: " + error.message);
    }
  }
}