import { ProfileModel, IProfile } from "./profile.model";

export class ProfileService {

    /**
     * Crea un perfil de usuario en MongoDB.
     * El usuario YA debe existir en Firebase (creado desde el frontend).
     */
    async createProfile(data: Partial<IProfile>): Promise<IProfile> {

        if (!data.firebaseUid) {
            throw new Error("firebaseUid is required");
        }

        if (!data.email) {
            throw new Error("email is required");
        }

        if (!data.name) {
            throw new Error("name is required");
        }

        // Evitar crear perfiles duplicados
        const existingProfile = await ProfileModel.findOne({
            firebaseUid: data.firebaseUid,
        });

        if (existingProfile) {
            throw new Error("Profile already exists for this user");
        }

        const newProfile = new ProfileModel({
            firebaseUid: data.firebaseUid,
            email: data.email,
            name: data.name,
            country: data.country ?? "UNKNOWN",
        });

        return await newProfile.save();
    }

    async getProfileById(id: string): Promise<IProfile | null> {
        return await ProfileModel.findById(id);
    }

    async getAllProfiles(): Promise<IProfile[]> {
        return await ProfileModel.find();
    }

    async updateProfile(
        id: string,
        updates: Partial<IProfile>
    ): Promise<IProfile | null> {
        return await ProfileModel.findByIdAndUpdate(id, updates, {
            new: true,
        });
    }

    /**
     * Elimina SOLO el perfil en MongoDB.
     * El usuario en Firebase NO se elimina aquí.
     */
    async deleteProfile(id: string): Promise<void> {
        await ProfileModel.findByIdAndDelete(id);
    }

    async getProfileByFirebaseUid(firebaseUid: string): Promise<IProfile | null> {
        return await ProfileModel.findOne({ firebaseUid });
    }
}