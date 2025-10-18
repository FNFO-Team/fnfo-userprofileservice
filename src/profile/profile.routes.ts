import { Router } from "express";

const router = Router();

// Ejemplo temporal: endpoint de prueba
router.get("/", (req, res) => {
  res.json({ message: "UserProfileService activo" });
});

export default router;
