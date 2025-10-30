import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

// Inicializa Firebase Admin SDK
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
}
// Más adelante podremos reemplazar applicationDefault() con nuestro archivo JSON de credenciales cuando tengamos el proyecto Firebase configurado.

export const firebaseAdmin = admin;