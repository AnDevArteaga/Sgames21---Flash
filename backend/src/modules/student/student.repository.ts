import pool from '../../config/db';

export class StudentInfoRepository {

  static async getInfoPhaseStudent(id: number) {
    const query = `SELECT * FROM informacion_fase WHERE id_usuario = $1`;
    const values = [id];
    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }

  }

}
