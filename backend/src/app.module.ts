import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { MessagesModule } from './messages/messages.module';

@Module({
  imports: [
    // Charger les variables d'environnement
    ConfigModule.forRoot({
      isGlobal: true, // Permet d'accéder aux variables d'environnement partout
    }),

    // Configurer Mongoose avec l'URL récupérée depuis .env
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        uri: configService.get<string>('DATABASE_URL'), // Récupère DATABASE_URL
        dbName: 'projet', // Nom de la base
      }),
      inject: [ConfigService], // Injecte le service de configuration
    }),

    // Autres modules
    AuthModule,
    UsersModule,
    MessagesModule,
  ],
})
export class AppModule {}