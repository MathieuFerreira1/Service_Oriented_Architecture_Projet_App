import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    /**
     * Endpoint pour enregistrer un nouvel utilisateur
     * @route POST /auth/register
     * @param userDto (correspond aux données envoyées par le client)
     */
    @Post('register')
    async register(@Body() userDto: any): Promise<any> {
        return this.authService.register(userDto);
    }

    /**
     * Endpoint pour connecter un utilisateur
     * @route POST /auth/login
     * @param loginDto (correspond aux données envoyées par le client)
     */
    @Post('login')
    async login(@Body() loginDto: any): Promise<any> {
        return this.authService.login(loginDto);
    }

    /**
     * Exemple de route sécurisée avec JWT
     * @route GET /auth/protected
     * @guards JwtAuthGuard
     */
    @Post('protected')
    @UseGuards(JwtAuthGuard)
    async protectedRoute(): Promise<any> {
        return { message: 'This is a protected route!' };
    }
}