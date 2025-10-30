import mongoose, { Schema, Document } from "mongoose";

export interface IProfile extends Document {
    firebaseUid: string;
    name: string;
    country: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
}

const ProfileSchema: Schema = new Schema<IProfile>(
    {
        firebaseUid: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        country: { type: String, required: true },
        email: { type: String, required: true, unique: true },
    },
    { timestamps: true }
);

export const ProfileModel = mongoose.model<IProfile>("Profile", ProfileSchema);