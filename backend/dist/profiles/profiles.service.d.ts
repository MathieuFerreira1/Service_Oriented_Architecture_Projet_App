import { Model } from 'mongoose';
import { Profile } from './profile.schema';
export declare class ProfilesService {
    private profileModel;
    constructor(profileModel: Model<Profile>);
    createProfile(profileData: {
        username: string;
        city: string;
        bio?: string;
    }): Promise<Profile>;
    findProfileByUsername(username: string): Promise<Profile | null>;
    findProfilesByCity(city: string): Promise<Profile[]>;
}
