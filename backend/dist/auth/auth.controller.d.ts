import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(userDto: any): Promise<any>;
    login(loginDto: any): Promise<any>;
    protectedRoute(): Promise<any>;
}
