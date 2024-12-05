import { Test, TestingModule } from '@nestjs/testing';
import { BoidController } from './boid.controller';
import { BoidService } from './boid.service';

describe('BoidController', () => {
  let controller: BoidController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BoidController],
      providers: [BoidService],
    }).compile();

    controller = module.get<BoidController>(BoidController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
