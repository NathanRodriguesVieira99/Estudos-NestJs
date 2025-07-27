import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';
import { ConfigModule } from '@nestjs/config';
import { vi } from 'vitest';

describe('PrismaService', () => {
    let service: PrismaService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [ConfigModule.forRoot({ isGlobal: true })],
            providers: [PrismaService],
        }).compile();

        service = module.get<PrismaService>(PrismaService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    it('should call $connect', async () => {
        const spyConnect = vi.spyOn(service, '$connect');

        await service.onModuleInit();

        expect(spyConnect).toBeCalledTimes(1);
    });
    it('should call $disconnect', async () => {
        const spyConnect = vi.spyOn(service, '$disconnect');

        await service.onModuleDestroy();

        expect(spyConnect).toBeCalledTimes(1);
    });
});
