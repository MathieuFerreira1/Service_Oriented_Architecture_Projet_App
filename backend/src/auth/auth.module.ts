import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    UsersModule, // Le module utilisateur pour la gestion des utilisateurs
    PassportModule.register({ defaultStrategy: 'jwt' }), // Définir 'jwt' comme stratégie par défaut
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default-secret-key', // Clé secrète pour signer les tokens
      signOptions: { expiresIn: '1h' }, // Durée de validité des tokens
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy], // Fournir le service et la stratégie JWT
  exports: [AuthService], // Exporter AuthService pour l'utiliser dans d'autres modules
})
export class AuthModule {}
