import { Router } from "express";
import { AgentController } from "../modules/agent/agent.controller";

const router = Router();

router.get("/:key", AgentController.getMessage);

export default router;