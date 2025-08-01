import type { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from '@/app.module';
import { Env } from '@/config/env';

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		// logger: false,
	});

	const configService = app.get<ConfigService<Env, true>>(ConfigService);
	const port = configService.get('PORT', { infer: true });
	const corsOrigin = configService.get('CORS_ORIGIN', { infer: true });

	setupSwagger(app);

	app.enableCors({ origin: corsOrigin ?? '*' });

	await app.listen(port);
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const setupSwagger = (app: INestApplication) => {
	const config = new DocumentBuilder()
		.setTitle('Estudos NestJs')
		.setDescription('Meus estudos de NestJs')
		.setVersion('0.0.1')
		.addTag('questions-api')
		.build();
	const documentFactory = () => SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api', app, documentFactory);
};

bootstrap();
