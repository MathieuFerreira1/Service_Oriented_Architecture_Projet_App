import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Profile } from './profile.schema';

@Injectable()
export class ProfilesService {
    constructor(@InjectModel(Profile.name) private profileModel: Model<Profile>) {}

    // Créer un profil
    async createProfile(profileData: { username: string; city: string; bio?: string }): Promise<Profile> {
        const profile = new this.profileModel(profileData);
        return await profile.save();
    }

    // Trouver un profil par nom d'utilisateur
    async findProfileByUsername(username: string): Promise<Profile | null> {
        return this.profileModel.findOne({ username }).exec();
    }

    // Trouver des profils par ville
    async findProfilesByCity(city: string): Promise<Profile[]> {
        return this.profileModel.find({ city }).exec();
    }
}