import type { UserPayload } from '@/schemas/tokenPayloadSchema';
import { createParamDecorator, type ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
	(_: never, context: ExecutionContext) => {
		const request = context.switchToHttp().getRequest();

		return request.user as UserPayload;
	},
);
