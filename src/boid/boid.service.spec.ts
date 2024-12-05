import { Test, TestingModule } from '@nestjs/testing';
import { BoidService } from './boid.service';

describe('BoidService', () => {
  let service: BoidService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoidService],
    }).compile();

    service = module.get<BoidService>(BoidService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
