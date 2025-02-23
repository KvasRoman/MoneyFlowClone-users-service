import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(AppModule, {
    transport: Transport.TCP,
    options: { host: '127.0.0.1', port: 3002 }, // Auth-service runs on port 3001
    logger: ['log', 'error', 'warn', 'debug', 'verbose'], // ✅ Enable all log levels
  });

  console.log('Auth Microservice is running on port 3002');
  await app.listen();
}
bootstrap();
