import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '@/auth/auth.module';
import { envSchema } from '@/config/env';
import { AuthenticateController } from '@/controllers/authenticate.controller';
import { CreateAccountController } from '@/controllers/create-account.controller';
import { CreateQuestionController } from '@/controllers/create-question.controller';
import { PrismaService } from '@/services/prisma/prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    AuthModule,
  ],
  controllers: [
    CreateAccountController,
    AuthenticateController,
    CreateQuestionController,
  ],
  providers: [PrismaService],
})
export class AppModule {}
