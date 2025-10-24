import { Module } from '@nestjs/common';
import { envSchema } from '@/config/env';

/*
 MODULES
 */
import { AuthModule } from '@/auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { PrismaModule } from './modules/prisma/prisma.module';
/*
  CONTROLLERS
 */
import { AuthenticateController } from '@/controllers/authenticate.controller';
import { CreateAccountController } from '@/controllers/create-account.controller';
import { CreateQuestionController } from '@/controllers/create-question.controller';
import { FetchRecentQuestionsController } from './controllers/fetch-recent-questions.controller';

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
    FetchRecentQuestionsController,
  ],
  providers: [],
})
export class AppModule {}
