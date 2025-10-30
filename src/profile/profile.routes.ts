import { Router } from "express";
import { ProfileController } from "./profile.controller";
import { verifyAuth } from "../security/auth.middleware";

const router = Router();
const controller = new ProfileController();

router.get("/health", (req, res) => {
    res.json({ message: "UserProfileService active" });
});

router.get("/", verifyAuth, controller.getAll.bind(controller));
router.get("/:id", verifyAuth, controller.getById.bind(controller));
router.post("/", verifyAuth, controller.create.bind(controller));
router.put("/:id", verifyAuth, controller.update.bind(controller));
router.delete("/:id", verifyAuth, controller.delete.bind(controller));

/** RUTAS SIN AUTENTICACIÓN PARA PRUEBAS
router.get("/", controller.getAll.bind(controller));
router.get("/:id", controller.getById.bind(controller));
router.post("/", controller.create.bind(controller));
router.put("/:id", controller.update.bind(controller));
router.delete("/:id", controller.delete.bind(controller));
 */
export default router;