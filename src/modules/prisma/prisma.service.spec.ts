import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from './prisma.service';

const PrismaServiceMock = () => ({
  onModuleInit: vi.fn(),
  onModuleDestroy: vi.fn(),
  $connect: vi.fn(),
  $disconnect: vi.fn(),
});

describe('PrismaService', () => {
  let service: PrismaService;
  const prismaServiceMock = PrismaServiceMock();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ isGlobal: true })],
      providers: [
        {
          provide: PrismaService,
          useValue: prismaServiceMock,
        },
      ],
    }).compile();

    service = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should call $connect', async () => {
    prismaServiceMock.onModuleInit.mockImplementation(() => {
      prismaServiceMock.$connect();
    });

    await service.onModuleInit();

    expect(service.$connect).toBeCalledTimes(1);
  });

  it('should call $disconnect', async () => {
    prismaServiceMock.onModuleDestroy.mockImplementation(() => {
      prismaServiceMock.$disconnect();
    });
    await service.onModuleDestroy();

    expect(service.$disconnect).toBeCalledTimes(1);
  });
});
