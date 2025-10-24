import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/auth/current-user.decorator';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import type { UserPayload } from '@/schemas/user-payload.schema';
import {
  createQuestionBodySchema,
  type CreateQuestionBodySchema,
} from '@/schemas/create-question-body.schema';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { convertToSlug } from '@/utils/convert-to-slug';

const bodyValidationPipe = new ZodValidationPipe(createQuestionBodySchema);

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
  constructor(private readonly prismaService: PrismaService) {}

  @Post()
  async execute(
    @Body(bodyValidationPipe) body: CreateQuestionBodySchema,
    @CurrentUser() user: UserPayload,
  ) {
    const { title, content } = body;
    const userId = user.sub;

    const slug = convertToSlug(title);

    await this.prismaService.question.create({
      data: {
        authorId: userId,
        title,
        content,
        slug,
      },
    });
  }
}
