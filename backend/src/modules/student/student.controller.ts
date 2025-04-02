import { Request, Response } from "express";
import { StudentInfoService } from "./student.service";

export class StudentInfoController {
  static async getInfoPhaseStudent(req: Request, res: Response) {
    const { id } = req.params;
    try {
      const response = await StudentInfoService.getInfoPhaseStudent(Number(id));
      res.status(200).json(response);
    } catch (error: any) {
      res.status(400).json({ success: false, message: error.message });
    }
  }
}