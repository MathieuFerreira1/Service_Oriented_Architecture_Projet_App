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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // Créer un compte
  @Post('register')
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  // Recherche par ville
  @Get('search')
  async searchByCity(@Query('city') city: string) {
    return this.usersService.searchByCity(city);
  }

  // Recherche par email
  @Get('findByEmail')
  async findByCEmail(@Query('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  // Rechercher un utilisateur par username
  @Get(':username')
  @UseGuards(JwtAuthGuard) // Protégé par JWT
  async getProfile(@Param('username') username: string) {
    return this.usersService.findByUsername(username);
  }

  // Mise à jour du profil
  @Put(':username')
  @UseGuards(JwtAuthGuard) // Protégé par JWT
  async updateProfile(
    @Param('username') username: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(username, updateUserDto);
  }
}
