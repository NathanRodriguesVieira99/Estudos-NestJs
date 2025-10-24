import { PrismaService } from '@/modules/prisma/prisma.service';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import {
  pageQueryParamSchema,
  type PageQueryParamSchema,
} from '@/schemas/page-query-param.schema';
import { Controller, Get, Query } from '@nestjs/common';

const queryValidationPipe = new ZodValidationPipe(pageQueryParamSchema);

@Controller('/questions')
export class FetchRecentQuestionsController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get()
  async execute(
    @Query('page', queryValidationPipe) page: PageQueryParamSchema,
  ) {
    const perPage = 20;

    const questions = await this.prismaService.question.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
      orderBy: {
        createdAt: 'desc',
      },
    });

    return { questions };
  }
}
