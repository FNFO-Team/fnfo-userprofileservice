import { Router } from "express";

const router = Router();

// Ejemplo temporal: endpoint de prueba
router.get("/", (req, res) => {
  res.json({ message: "UserProfileService active" });
});

export default router;
