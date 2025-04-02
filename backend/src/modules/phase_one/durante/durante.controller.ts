import { Request, Response } from "express";
import { DuranteService } from "./durante.service";

export class DuranteController {
  static async saveDurante(req: Request, res: Response) {
    const { id, q1, q2, q3 } = req.body;
    console.log(req.body);
    try {
      const result = await DuranteService.saveDurante(id, q1, q2, q3);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  static async updateStrategy(req: Request, res: Response) {
    const { id, newStrategy } = req.body;
    try {
      const result = await DuranteService.updateStrategy(id, newStrategy);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
           