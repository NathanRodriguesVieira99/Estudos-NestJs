import {
	Body,
	ConflictException,
	Controller,
	HttpCode,
	Post,
	UsePipes,
} from '@nestjs/common';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import {
	type CreateAccountBodySchema,
	createAccountBodySchema,
} from '@/schemas/createAccountBodySchema';
import { hashPassword } from '@/utils/hash';

@Controller('/accounts')
export class CreateAccountController {
	constructor(private prisma: PrismaService) {}

	@Post()
	@HttpCode(201)
	@UsePipes(new ZodValidationPipe(createAccountBodySchema))
	async execute(@Body() body: CreateAccountBodySchema) {
		const { name, email, password } = body;

		const userWithSameEmail = await this.prisma.user.findUnique({
			where: {
				email,
			},
		});

		if (userWithSameEmail) {
			throw new ConflictException('User with same email already exists');
		}

		const hashedPassword = await hashPassword(password);

		await this.prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
			},
		});
	}
}
