import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Activer CORS dans le backend NestJS
  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:4201',
      'http://localhost:4202',
      'http://localhost:4203',
    ], // Les origines de votre frontend_old Angular
    methods: 'GET,POST,PUT,DELETE,MessagePattern', // Méthodes autorisées
    allowedHeaders: 'Content-Type, Authorization', // Headers autorisés
  });


  // const kafkaClient = app.get('KAFKA_SERVICE');
  // await kafkaClient.connect(); // Important : connecte le client Kafka
  const app1 = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: ['kafka:9092'],
      },
      consumer: {
        groupId: 'my-group',
      },
    }
  });

  await app1.listen();

  await app.listen(3000); // Le port de votre backend
}
bootstrap();
