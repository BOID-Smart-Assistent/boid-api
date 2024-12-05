import { Test, TestingModule } from '@nestjs/testing';
import { ConferencesService } from './conferences.service';

describe('ConferencesService', () => {
  let service: ConferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConferencesService],
    }).compile();

    service = module.get<ConferencesService>(ConferencesService);
  });

  it('Creating schedule from presentation ids', () => {
    const presentations = [5, 10, 9, 8, 7, 6];

    expect(service.scheduleFromPresentationIds(presentations)).toBeDefined();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
