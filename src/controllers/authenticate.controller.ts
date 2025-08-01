import {
	Body,
	Controller,
	Post,
	UnauthorizedException,
	UsePipes,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '@/modules/prisma/prisma.service';
import { ZodValidationPipe } from '@/pipes/zod-validation-pipe';
import {
	type AuthenticateBodySchema,
	authenticateBodySchema,
} from '@/schemas/authenticateBodySchema';
import { comparePassword } from '@/utils/hash';

@Controller('/sessions')
export class AuthenticateController {
	constructor(
		private prisma: PrismaService,
		private jwt: JwtService,
	) {}

	@Post()
	@UsePipes(new ZodValidationPipe(authenticateBodySchema))
	async execute(@Body() body: AuthenticateBodySchema) {
		const { email, password } = body;

		const user = await this.prisma.user.findUnique({
			where: { email },
		});

		if (!user) {
			throw new UnauthorizedException('User credentials do not match.');
		}

		const isPasswordValid = comparePassword(password, user.password);

		if (!isPasswordValid) {
			throw new UnauthorizedException('User credentials do not match.');
		}

		const accessToken = this.jwt.sign({ sub: user.id });

		return { access_token: accessToken };
	}
}
