import { AntesDeRepository } from "./antesDe.repository";
import { Meta } from "../../../interfaces/meta.interface";

export class AntesDeService {
  static async getInfoPhaseStudent(id: number): Promise<Meta> {
    if (!id) {
      throw new Error("No hay id");
    }

    try {
      const info = await AntesDeRepository.getInfoPhaseStudent(id);
      if (!info) {
        throw new Error("No se pudo obtener la información de fase");
      }
      return {
        success: true,
        message: "Información de fase obtenida correctamente",
        data: info,
      };
    } catch (error: any) {
      throw new Error(
        "Error al obtener la información de fase: " + error.message,
      );
    }
  }

  static async updateInfoPhaseStudent(
    id_stage: number,
    id_user: number,
  ): Promise<Meta> {
    if (!id_stage || !id_user) {
      throw new Error("Sin etapas o sin usuarios proporcionados");
    }
    try {
      const info = await AntesDeRepository.updateInfoStageStudent(id_stage, id_user);
      if (!info) {
        throw new Error("No se pudo actualizar el progreso");
      }
      const newStage = await AntesDeRepository.getInfoPhaseStudent(id_user)
      if (!newStage) {
        throw new Error("No se pudo obtener la nueva fase")
      }
      return {
        success: true,
        message: "Nueva Etapa actualizada",
        data: newStage
      };
    } catch (error: any) {
      throw new Error(
        "Error al actualizar el progreso: " + error.message,
      );
    }
  }

  static async getStrategyStudent(id: number): Promise<Meta> {
    if (!id) {
      throw new Error("No hay id");
    }

    try {
      const info = await AntesDeRepository.getStrategyStudent(id);
      if (!info) {
        throw new Error("No se pudo obtener la información de estrategia");
      }
      return {
        success: true,
        message: "Información de estrategia obtenida correctamente",
        data: info,
      };
    } catch (error: any) {
      throw new Error(
        "Error al obtener la información de estrategia: " + error.message,
      );
    }
  }

  static async updatedStrategyStudent(id: number, strategy: string, organizer: string, tool: string): Promise<Meta> {
    if (!id || !strategy || !organizer || !tool) {
      throw new Error("Sin etapas o sin usuarios proporcionados");
    }
    try {
      const updatedStrategy = await AntesDeRepository.updateStrategySudent(id, strategy, organizer, tool);
      if (!updatedStrategy) {
        throw new Error("No se pudo actualizar la estrategia");
      }

      const strategyStudent = await AntesDeRepository.getStrategyStudent(id)
      if (!strategyStudent) {
        throw new Error("No se pudo obtener la nueva estrategia")
      }
      return {
        success: true,
        message: "Nueva estrategia actualizada",
        data: strategyStudent
      };
    } catch (error: any) {
      throw new Error(
        "Error al actualizar la estrategia: " + error.message,
      );
    }
  }

  static async getProgressActivity(id: number): Promise<Meta> {
    if (!id) {
      throw new Error("No hay id");
    }

    try {
      const info = await AntesDeRepository.getProgressActivity(id);
      if (!info) {
        throw new Error("No se pudo obtener la información de progreso");
      }
      return {
        success: true,
        message: "Información de progreso obtenida correctamente",
        data: info,
      };
    } catch (error: any) {
      throw new Error(
        "Error al obtener la información de progreso: " + error.message,
      );
    }
  }
  static async updateProgressActivity(
    id: number,
    activity: string
  ): Promise<Meta> {
    if (!id || !activity) {
      throw new Error("Debe proporcionar un ID y al menos un campo a actualizar");
    }
  
    try {
      const updatedProgress = await AntesDeRepository.updateProgressActivity(id, activity);
      if (!updatedProgress) {
        throw new Error("No se pudo actualizar el progreso");
      }
  
      const progressActivity = await AntesDeRepository.getProgressActivity(id);
      if (!progressActivity) {
        throw new Error("No se pudo obtener la nueva información de progreso");
      }
  
      return {
        success: true,
        message: "Progreso actualizado exitosamente",
        data: progressActivity
      };
    } catch (error: any) {
      throw new Error("Error al actualizar el progreso: " + error.message);
    }
  }
}
