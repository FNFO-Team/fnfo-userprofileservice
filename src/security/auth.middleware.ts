import { Request, Response, NextFunction } from "express";
import { firebaseAdmin } from "../config/firebase";

export async function verifyAuth(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization || "";
    const token = auth.startsWith("Bearer ") ? auth.substring(7) : null;

    if (!token) return res.status(401).json({ message: "Token no proporcionado" });

    try {
        const decoded = await firebaseAdmin.auth().verifyIdToken(token);
        (req as any).user = decoded; // uid, email, claims...
        next();
    } catch (e) {
        return res.status(401).json({ message: "Token inválido" });
    }
}