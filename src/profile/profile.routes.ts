import { Router } from "express";
import { ProfileController } from "./profile.controller";
import { verifyAuth } from "../security/auth.middleware";

const router = Router();
const controller = new ProfileController();

/**
 * Health check (público)
 */
router.get("/health", (req, res) => {
    res.json({ message: "UserProfileService active" });
});

/**
 * Rutas protegidas (requieren Firebase ID Token)
 */
router.get("/", verifyAuth, controller.getAll.bind(controller));

router.get(
    "/by-firebase/:firebaseUid",
    verifyAuth,
    controller.getByFirebaseUid.bind(controller)
);

router.get("/:id", verifyAuth, controller.getById.bind(controller));

router.post("/", verifyAuth, controller.create.bind(controller));

router.put("/:id", verifyAuth, controller.update.bind(controller));

router.delete("/:id", verifyAuth, controller.delete.bind(controller));

/**
 * 🔧 RUTAS SIN AUTENTICACIÓN (solo para pruebas locales)
 *
 * router.get("/", controller.getAll.bind(controller));
 * router.get("/by-firebase/:firebaseUid", controller.getByFirebaseUid.bind(controller));
 * router.get("/:id", controller.getById.bind(controller));
 * router.post("/", controller.create.bind(controller));
 * router.put("/:id", controller.update.bind(controller));
 * router.delete("/:id", controller.delete.bind(controller));
 */

export default router;
