import { Request, Response, NextFunction } from "express";
import { ProfileService } from "./profile.service";

const service = new ProfileService();

export class ProfileController {
    async create(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const profile = await service.createProfile(req.body);
            res.status(201).json(profile);
        } catch (error) {
            next(error);
        }
    }

    async getAll(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const profiles = await service.getAllProfiles();
            res.json(profiles);
        } catch (error) {
            next(error);
        }
    }

    async getById(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const profile = await service.getProfileById(req.params.id);
            if (!profile) {
                res.status(404).json({ message: "Perfil no encontrado" });
            } else {
                res.json(profile);
            }
        } catch (error) {
            next(error);
        }
    }

    async update(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            const profile = await service.updateProfile(req.params.id, req.body);
            if (!profile) {
                res.status(404).json({ message: "Perfil no encontrado" });
            } else {
                res.json(profile);
            }
        } catch (error) {
            next(error);
        }
    }

    async delete(req: Request, res: Response, next: NextFunction): Promise<void> {
        try {
            await service.deleteProfile(req.params.id);
            res.status(204).send();
        } catch (error) {
            next(error);
        }
    }
}