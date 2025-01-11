import { Injectable, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    try {
      const user = await this.usersService.findByEmail(email);
      if (!user) {
        this.logger.warn(`No user found with email: ${email}`);
        return null;
      }

      this.logger.log(`User found: ${user.email}`);

      const isMatch = await bcrypt.compare(password, user.password);
      this.logger.log(`Password match result: ${isMatch}`);

      if (!isMatch) {
        this.logger.warn('Invalid credentials');
        return null;
      }

      const { password: _, ...result } = user.toObject();
      return result;
    } catch (error) {
      this.logger.error('Error validating user', error.stack);
      throw new UnauthorizedException('Error validating user');
    }
  }

  async login(loginDto: any) {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const payload = { username: user.username, sub: user._id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: any): Promise<any> {
    // const hashedPassword = await bcrypt.hash(userDto.password, 10);
    return this.usersService.createUser({
      ...userDto,
      password: userDto.password,
    });
  }
}
