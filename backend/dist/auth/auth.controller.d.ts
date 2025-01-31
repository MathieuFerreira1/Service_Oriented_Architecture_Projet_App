import { AuthService } from './auth.service';
import { ClientKafka } from '@nestjs/microservices';
export declare class AuthController {
    private readonly authService;
    private kafkaService;
    constructor(authService: AuthService, kafkaService: ClientKafka);
    register(userDto: any): Promise<any>;
    login(loginDto: any): Promise<any>;
    protectedRoute(): Promise<any>;
}
