import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:4200',
      'http://localhost:4201',
      'http://localhost:4202',
      'http://localhost:4203',
    ],
    methods: 'GET,POST,PUT,DELETE,MessagePattern',
    allowedHeaders: 'Content-Type, Authorization',
  });


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

  await app.listen(3000);
}
bootstrap();
