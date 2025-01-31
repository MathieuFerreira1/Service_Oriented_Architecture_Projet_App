import {
  Controller,
  Post,
  Get,
  Put,
  Body,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { MessagePattern, Payload } from '@nestjs/microservices';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Create an account
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Search by city
  @Get('search')
  async searchByCity(@Query('city') city: string) {
    return this.usersService.searchByCity(city);
  }

  // Search by email
  @Get('findByEmail')
  async findByEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  // Search for a user by username
  @Get(':username')
  @UseGuards(JwtAuthGuard) // Protected by JWT
  async getProfile(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  // Update profile
  @Put(':username')
  @UseGuards(JwtAuthGuard) // Protected by JWT
  async updateProfile(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(username, updateUserDto);
  }

  @MessagePattern('user.created') // Listen to events on the "user.created" topic
  handleUserCreated(@Payload() message: any) {
    console.log('New user created:', message);
    // Business logic to handle the event
  }
}