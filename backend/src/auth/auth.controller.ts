import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Inject } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
              @Inject('KAFKA_SERVICE') private kafkaService: ClientKafka
  ) {}

  /**
   * Endpoint to register a new user
   * @route POST /auth/register
   * @param userDto (corresponds to the data sent by the client)
   */
  @Post('register')
  async register(@Body() userDto: any): Promise<any> {
    // this.kafkaService.emit('user.created', { id: userDto.id, username: userDto.username });
    this.kafkaService.emit('user.created', `${userDto.username } has been created`);
    return this.authService.register(userDto);
  }

  /**
   * Endpoint to log in a user
   * @route POST /auth/login
   * @param loginDto (corresponds to the data sent by the client)
   */
  @Post('login')
  async login(@Body() loginDto: any): Promise<any> {
    return this.authService.login(loginDto);
  }

  /**
   * Example of a protected route with JWT
   * @route GET /auth/protected
   * @guards JwtAuthGuard
   */
  @Post('protected')
  @UseGuards(JwtAuthGuard)
  async protectedRoute(): Promise<any> {
    return { message: 'This is a protected route!' };
  }
}