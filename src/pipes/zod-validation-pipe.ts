import { BadRequestException, type PipeTransform } from '@nestjs/common';
import { ZodError, type ZodSchema } from 'zod';

export class ZodValidationPipe implements PipeTransform {
    constructor(private schema: ZodSchema) {}

    transform(value: unknown) {
        try {
            const parsedValue = this.schema.parse(value);
            return parsedValue;
        } catch (error) {
            if (error instanceof ZodError) {
                throw new BadRequestException({
                    message: 'Validation failed',
                    statusCode: 400,
                    /* 
          !FIX talvez refatorar esse trecho o código pois foi feito com ajuda de IA pois o do tutorial está depreciado 
          */
                    errors: error.issues.map((issue) => ({
                        path: issue.path.join('.'),
                        message: issue.message,
                        code: issue.code,
                    })),
                });
            }
            throw new BadRequestException('Validation failed');
        }
    }
}
