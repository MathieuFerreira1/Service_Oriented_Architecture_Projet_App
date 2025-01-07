import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { SearchService } from './search.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('search')
export class SearchController {
    constructor(private readonly searchService: SearchService) {}

    @Get()
    @UseGuards(JwtAuthGuard)  // Sécuriser la route avec JWT
    async search(@Query('city') city: string) {
        return this.searchService.searchByCity(city);
    }
}