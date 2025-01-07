import { ProfilesService } from '../profiles/profiles.service';
export declare class SearchService {
    private readonly profilesService;
    constructor(profilesService: ProfilesService);
    searchByCity(city: string): Promise<import("../profiles/profile.schema").Profile[]>;
}
