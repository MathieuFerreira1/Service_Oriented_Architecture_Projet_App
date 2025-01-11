import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS dans le backend NestJS
  app.enableCors({
    origin: 'http://localhost:4201', // L'origine de votre frontend Angular
    methods: 'GET,POST,PUT,DELETE', // Méthodes autorisées
    allowedHeaders: 'Content-Type, Authorization', // Headers autorisés
  });

  await app.listen(3000); // Le port de votre backend
}
bootstrap();
