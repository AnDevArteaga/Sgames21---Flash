import { DuranteRepository } from "./durante.repository";
import { AntesDeRepository } from "../antesDe/antesDe.repository";


export class DuranteService {
  static async saveDurante(id: number, q1: number, q2: number, q3: number) {
    try {
      const newDurante = await DuranteRepository.saveDuranteStudent(id, q1, q2, q3);
      const strategy = await AntesDeRepository.getStrategyStudent(id);
      console.log(strategy);
      console.log(q1);
      console.log(newDurante)
      if (q1 == 3) {
        const newStrategy = strategy.estrategia === "Búsqueda de Palabras Clave" ? "Lectura Crítica y Subrayado" : "Búsqueda de Palabras Clave";
        console.log('newStrategy', newStrategy)
        await DuranteRepository.updateStrategyStudent(id, newStrategy);
      }
      return {
        success: true,
        message: "Respuestas guardadas correctamente",
        data: newDurante,
      };
    } catch (error: any) {
      throw new Error("Error al guardar las respuestas: " + error.message);
    }
  }

  static async updateStrategy(id: number, newStrategy: string) {
    try {
      const updated = await DuranteRepository.updateStrategyStudent(id, newStrategy);
      return {
        success: true,
        message: "Estrategia actualizada correctamente",
        data: updated,
      };
    } catch (error: any) {
      throw new Error("Error al actualizar la estrategia: " + error.message);
    }
  }
}