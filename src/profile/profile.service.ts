import { ProfileModel, IProfile } from "./profile.model";
import { firebaseAdmin } from "../config/firebase";

export class ProfileService {
    async createProfile(data: Partial<IProfile>): Promise<IProfile> {
        const userRecord = await firebaseAdmin.auth().createUser({
            email: data.email!,
            password: "defaultPassword123", // temporal, se maneja luego por frontend
            displayName: data.name,
        });

        const newProfile = new ProfileModel({
            ...data,
            firebaseUid: userRecord.uid,
        });
        return await newProfile.save();
    }

    async getProfileById(id: string): Promise<IProfile | null> {
        return await ProfileModel.findById(id);
    }

    async getAllProfiles(): Promise<IProfile[]> {
        return await ProfileModel.find();
    }

    async updateProfile(id: string, updates: Partial<IProfile>): Promise<IProfile | null> {
        return await ProfileModel.findByIdAndUpdate(id, updates, { new: true });
    }

    async deleteProfile(id: string): Promise<void> {
        const profile = await ProfileModel.findById(id);
        if (profile) {
            await firebaseAdmin.auth().deleteUser(profile.firebaseUid);
            await ProfileModel.findByIdAndDelete(id);
        }
    }
}