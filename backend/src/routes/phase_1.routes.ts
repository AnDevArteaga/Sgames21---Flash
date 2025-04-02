import { Router } from "express";
import { AntesDeController } from "../modules/phase_one/antesDe/antesDe.controller";
import { DuranteController } from "../modules/phase_one/durante/durante.controller";

const router = Router();

router.get("/:id", AntesDeController.getMessage);
router.put("/updatePhase", AntesDeController.updatedStage)
router.put("/updatedStrategy", AntesDeController.updatedStrategy)
router.get("/strategy/:id", AntesDeController.getStrategy)
router.get("/progress/:id", AntesDeController.getProgress)
router.put("/updatedProgress", AntesDeController.updatedProgress)

router.post("/durante", DuranteController.saveDurante)
router.put("/durante/updateStrategy", DuranteController.updateStrategy)

export default router;