import pool from "../../../config/db";

export class AntesDeRepository {
  static async getInfoPhaseStudent(id: number) {
    const query = `
        SELECT e.etapa 
        FROM progreso_general_estudiante p
        JOIN etapas_p1 e ON p.id_etapa_p1 = e.id
        WHERE p.id_usuario = $1
        LIMIT 1;
      `;
    const values = [id];
    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }
  static async createInfoStageStudent(id: number) {
    const query = `
      INSERT INTO progreso_general_estudiante (id_usuario, id_etapa_p1)
      VALUES ($1, $2)
      RETURNING id_usuario, id_etapa_p1;
    `;
    const values = [id, 1];
    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }
  
  static async updateInfoStageStudent(id_stage: number, id_user: number) {
    const query =
      `UPDATE progreso_general_estudiante SET id_etapa_p1 = $1 WHERE id_usuario = $2`;
    const values = [id_stage, id_user];

    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rowCount! > 0; // Retorna true si se actualizó
    } finally {
      client.release();
    }
  }

  static async createInfoPhaseStudent(id: number, phase: string, titleOne: string, titleTwo: string, description: string, progress: number) {
    const query = `
      INSERT INTO informacion_fase (id_usuario, fase, titulo1, titulo2, descripcion, progreso )
      VALUES ($1, $2, $3, $4, $5, $6)
      RETURNING fase, titulo1, titulo2, descripcion, progreso;
    `;
    const values = [id, phase, titleOne, titleTwo, description, progress];
    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }



  static async createStrategyStudent(id: number) {
    const client = await pool.connect();
    try {
      const query = `INSERT INTO estrategia_f1 (id_usuario) 
                      VALUES ($1)`;
      const values = [id];

      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async getStrategyStudent(id:number) {
    const query = `SELECT * FROM estrategia_f1 WHERE id_usuario = $1`;
    const values = [id];

    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }
  }

  static async updateStrategySudent(id:number, strategy: string, organizer: string, tool: string) {
    const query = `UPDATE estrategia_f1 SET estrategia = $1, organizador = $2, herramienta = $3 WHERE id_usuario = $4`;
    const values = [strategy, organizer, tool, id];

    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      console.log(result)
      return result.rowCount! > 0;
    } finally {
      client.release();
    }
  }

  static async createProgressActivity(id: number) {
    const query = `
      INSERT INTO progreso_actividad_p1 (id_usuario, actividad1, durante, actividad2, despues)
      VALUES ($1, $2, $3, $4, $5)
    `;
    const values = [id, false, false, false, false];

    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      console.log(result)
      return result.rowCount! > 0;
    } finally {
      client.release();
    }
  }

  static async updateProgressActivity(
    id: number,
    activity: string
  ) {

  
    // Verifica que el campo que quieres actualizar está permitido
    const allowedFields = ["actividad1", "durante", "actividad2", "despues"];
    if (!allowedFields.includes(activity)) {
      throw new Error("Campo de actividad no permitido");
    }
    
    const query = `
    UPDATE progreso_actividad_p1
    SET ${activity} = TRUE
    WHERE id_usuario = $1
  `;
    const values = [id];
  
    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rowCount! > 0;
    } finally {
      client.release();
    }
  }
  static async getProgressActivity(id: number) {
    const query = `
      SELECT * FROM progreso_actividad_p1 WHERE id_usuario = $1
    `;
    const values = [id];

    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      console.log(result)
      return result.rows;
    } finally {
      client.release();
    }
  }
}
