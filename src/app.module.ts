import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';
import { envSchema } from '@/config/env';
import { AuthenticateController } from '@/controllers/authenticate.controller';
import { CreateAccountController } from '@/controllers/create-account.controller';
import { CreateQuestionController } from '@/controllers/create-question.controller';
import { PrismaModule } from './modules/prisma/prisma.module';

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			validate: (env) => envSchema.parse(env),
			isGlobal: true,
		}),
		AuthModule,
		PrismaModule,
	],
	controllers: [
		CreateAccountController,
		AuthenticateController,
		CreateQuestionController,
	],
	providers: [],
})
export class AppModule {}
