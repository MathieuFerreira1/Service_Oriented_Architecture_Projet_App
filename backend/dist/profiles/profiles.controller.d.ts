import { ProfilesService } from './profiles.service';
export declare class ProfilesController {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    createProfile(profileDto: {
        username: string;
        city: string;
        bio?: string;
    }): Promise<import("./profile.schema").Profile>;
    getProfile(username: string): Promise<import("./profile.schema").Profile>;
    getProfilesByCity(city: string): Promise<import("./profile.schema").Profile[]>;
}
