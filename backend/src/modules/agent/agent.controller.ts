import { Request, Response } from "express";
import { AgentService } from "./agent.service";

export class AgentController {
  static async getMessage(req: Request, res: Response) {
    const { key } = req.params;
    try {
      const result = await AgentService.getMessage(key);
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}