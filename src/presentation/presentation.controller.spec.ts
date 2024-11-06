import { Test, TestingModule } from '@nestjs/testing';
import { EventsController } from '../events/events.controller';
import { PresentationService } from './presentation.service';

describe('PresentationController', () => {
  let controller: EventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EventsController],
      providers: [PresentationService],
    }).compile();

    controller = module.get<EventsController>(EventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
