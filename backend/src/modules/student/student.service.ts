import { StudentInfoRepository } from "./student.repository";
import { Meta } from "../../interfaces/meta.interface";

export class StudentInfoService {

   // Actualiza la contraseña de un usuario por ID
   static async getInfoPhaseStudent(id: number): Promise<Meta> {
    if (!id ) {
      throw new Error("No hay id");
    }

    try {
      const info = await StudentInfoRepository.getInfoPhaseStudent(id);
      if (!info) {
        throw new Error("No se pudo obtener la información de fase");
      }
      return {
        success: true,
        message: "Información de fase obtenida correctamente",
        data: info,
      };
    } catch (error: any) {
      throw new Error("Error al obtener la información de fase: " + error.message);
    }
  }

  
}
