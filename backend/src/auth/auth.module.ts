import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    UsersModule, // The user module for user management
    PassportModule.register({ defaultStrategy: 'jwt' }), // Set 'jwt' as the default strategy
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret-key', // Secret key to sign tokens
      signOptions: { expiresIn: '1h' }, // Token validity duration
    }),
    ClientsModule.register([
      {
        name: 'KAFKA_SERVICE',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'auth',
            brokers: ['kafka:9092'],
          },
          consumer: {
            groupId: 'my-group-auth',
          },
        },
      },
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Provide the service and JWT strategy
  exports: [AuthService], // Export AuthService for use in other modules
})
export class AuthModule {}