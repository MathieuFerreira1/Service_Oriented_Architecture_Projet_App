import { Controller, Post, Body, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('login')
    async login(@Body() body: { username: string; password: string }) {
        return this.authService.login(body);
    }

    @Post('register')
    async register(@Body() body: { username: string; password: string; city: string }) {
        return this.authService.register(body);
    }
}