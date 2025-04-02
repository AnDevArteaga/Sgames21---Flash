import { Request, Response } from "express";
import { AntesDeService } from "./antesDe.service";

export class AntesDeController {
  static async getMessage(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await AntesDeService.getInfoPhaseStudent(Number(id));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async getStrategy(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const result = await AntesDeService.getStrategyStudent(Number(id));
      res.status(200).json(result);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }

  static async updatedStage(req: Request, res: Response) {
    const { id_stage, id_user } = req.body;
    try {
      const response = await AntesDeService.updateInfoPhaseStudent(id_stage, id_user)
      res.status(201).json(response)
  }  catch (error: any) {
    res.status(400).json({ success: false, message: error.message });

  }
}

static async updatedStrategy(req: Request, res: Response) {
  const { id, strategy, organizer, tool } = req.body;
  console.log(id, strategy, organizer, tool)
  try {
    const response = await AntesDeService.updatedStrategyStudent(id, strategy, organizer, tool)
    res.status(201).json(response)
}  catch (error: any) {
  res.status(400).json({ success: false, message: error.message });
}
}

static async getProgress(req: Request, res: Response) {
  const { id } = req.params;
  try {
    const result = await AntesDeService.getProgressActivity(Number(id));
    res.status(200).json(result);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
}

static async updatedProgress(req: Request, res: Response) {
  const { id, activity } = req.body;
  console.log(id, activity)
  try {
    const response = await AntesDeService.updateProgressActivity(id, activity)
    res.status(201).json(response)
}  catch (error: any) {
  res.status(400).json({ success: false, message: error.message });
}
}
}