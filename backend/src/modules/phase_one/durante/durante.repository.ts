import pool from "../../../config/db";

export class DuranteRepository {
static async saveDuranteStudent(id: number, q1: number, q2: number, q3: number) {
    const query = `
      INSERT INTO respuestas_durante_p1 (usuario_id, q1, q2, q3)
      VALUES ($1, $2, $3, $4)
      RETURNING usuario_id, q1;
    `;
    const values = [id, q1, q2, q3];
    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows.length > 0 ? result.rows[0] : null;
    } finally {
      client.release();
    }
  }

  static async updateStrategyStudent (id: number, newStrategy: string) {
    console.log(id, newStrategy);
    const query = `UPDATE estrategia_f1 SET estrategia = $1 WHERE id_usuario = $2`;

    const values = [newStrategy, id];

    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rowCount! > 0;
    } finally {
      client.release();
    }
  }

  
}
