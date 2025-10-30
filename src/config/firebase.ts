import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const credentialsPath = process.env.GOOGLE_APPLICATION_CREDENTIALS;

if (!credentialsPath) {
    throw new Error(
        "No se encontró la variable GOOGLE_APPLICATION_CREDENTIALS en el archivo .env"
    );
}

// Inicializa Firebase Admin con la clave JSON local
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
    });
    console.log("Firebase Admin inicializado correctamente con archivo local");
}

export const firebaseAdmin = admin;