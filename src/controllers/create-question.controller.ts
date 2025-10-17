import { Controller, Post, UseGuards } from '@nestjs/common';
import { CurrentUser } from '@/auth/current-user-decorator';
import { JwtAuthGuard } from '@/auth/jwt-auth.guard';
import type { UserPayload } from '@/schemas/tokenPayloadSchema';

@Controller('/questions')
@UseGuards(JwtAuthGuard)
export class CreateQuestionController {
	constructor() {}

	@Post()
	async execute(@CurrentUser() user: UserPayload) {
		console.log(user);

		return 'ok';
	}
}
