"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
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
    const app1 = await core_1.NestFactory.createMicroservice(app_module_1.AppModule, {
        transport: microservices_1.Transport.KAFKA,
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
//# sourceMappingURL=main.js.map