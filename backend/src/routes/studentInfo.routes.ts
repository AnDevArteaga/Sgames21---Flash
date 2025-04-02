import { Router } from "express";
import { StudentInfoController } from "../modules/student/student.controller";

const router = Router();

router.get("/:id", StudentInfoController.getInfoPhaseStudent);

export default router;