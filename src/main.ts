import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from '@/app.module';
import { Env } from '@/config/env';
import { setupSwagger } from './config/docs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // logger: false,
  });

  const configService = app.get<ConfigService<Env, true>>(ConfigService);
  const port = configService.get('PORT', { infer: true });
  const corsOrigin = configService.get('CORS_ORIGIN', { infer: true });

  // SWAGGER para a documentação da API
  setupSwagger(app);

  app.enableCors({ origin: corsOrigin ?? '*' });

  await app.listen(port);
}

bootstrap();
