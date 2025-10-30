import { Request, Response, NextFunction } from "express";
import { firebaseAdmin } from "../config/firebase";

export async function verifyAuth(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split("Bearer ")[1];
    if (!token) return res.status(401).json({ message: "Token no proporcionado" });

    try {
        const decoded = await firebaseAdmin.auth().verifyIdToken(token);
        (req as any).user = decoded;
        next();
    } catch {
        res.status(401).json({ message: "Token inválido" });
    }
}