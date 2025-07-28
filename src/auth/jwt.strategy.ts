import { ExtractJwt, Strategy } from 'passport-jwt';
import type { Env } from '@/config/env';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
	tokenPayloadSchema,
	type UserPayload,
} from '@/schemas/tokenPayloadSchema';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(config: ConfigService<Env, true>) {
		const publicKey = config.get('JWT_PUBLIC_KEY', { infer: true });

		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: Buffer.from(publicKey, 'base64'),
			algorithms: ['RS256'],
		});
	}

	async validate(payload: UserPayload) {
		return tokenPayloadSchema.parse(payload);
	}
}
