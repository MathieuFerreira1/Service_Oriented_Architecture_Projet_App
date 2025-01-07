import { SearchService } from './search.service';
export declare class SearchController {
    private readonly searchService;
    constructor(searchService: SearchService);
    search(city: string): Promise<import("../profiles/profile.schema").Profile[]>;
}
