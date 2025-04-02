import pool from "../../config/db";
export class AgentRepository {

  static async getMessage(key: string) {
    const query = `SELECT mensaje FROM agente WHERE clave_msg = $1`;
    const values = [key];
    const client = await pool.connect();
    try {
      const result = await client.query(query, values);
      return result.rows[0];
    } finally {
      client.release();
    }

  }
}
