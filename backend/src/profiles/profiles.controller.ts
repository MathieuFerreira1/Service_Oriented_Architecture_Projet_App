import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('profiles')
export class ProfilesController {
    constructor(private readonly profilesService: ProfilesService) {}

    @Post()
    @UseGuards(JwtAuthGuard)  // Sécuriser la route avec JWT
    async createProfile(@Body() profileDto: { username: string; city: string; bio?: string }) {
        return this.profilesService.createProfile(profileDto);
    }

    @Get(':username')
    @UseGuards(JwtAuthGuard)  // Sécuriser la route avec JWT
    async getProfile(@Param('username') username: string) {
        return this.profilesService.findProfileByUsername(username);
    }

    @Get('city/:city')
    @UseGuards(JwtAuthGuard)  // Sécuriser la route avec JWT
    async getProfilesByCity(@Param('city') city: string) {
        return this.profilesService.findProfilesByCity(city);
    }
}