import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{ cors: true });
  app.setGlobalPrefix('api/v1')
  app.enableCors({
    origin: [
      'https://hi-ch-shop2025-dashboard.vercel.app',
      'http://localhost:3000',
      'https://www.hi-chshopping.com'
      
    ],
    methods: ["GET", "POST","DELETE","PATCH"],
    credentials: true,
  });
  await app.listen(3333);
}
bootstrap();
