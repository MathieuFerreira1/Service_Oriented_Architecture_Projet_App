import { Injectable } from '@nestjs/common';
import { ProfilesService } from '../profiles/profiles.service'; // Assure-toi que le service Profiles est bien injecté

@Injectable()
export class SearchService {
    constructor(private readonly profilesService: ProfilesService) {}

    // Rechercher des profils par ville
    async searchByCity(city: string) {
        return this.profilesService.findProfilesByCity(city);
    }
}