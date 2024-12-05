import { Test, TestingModule } from '@nestjs/testing';
import { ConferencesController } from './conferences.controller';
import { ConferencesService } from './conferences.service';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { Conference } from './entities/conference.entity';
import { UpdateConferenceDto } from './dto/update-conference.dto';

describe('ConferencesController', () => {
  let controller: ConferencesController;
  let service: ConferencesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConferencesController],
      providers: [
        {
          provide: ConferencesService,
          useValue: {
            create: jest.fn(),
            update: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<ConferencesController>(ConferencesController);
    service = module.get<ConferencesService>(ConferencesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a conference successfully', async () => {
    const createConferenceDto: CreateConferenceDto = {
      title: 'AAAI',
    };

    const createdConference: Conference = {
      id: 1,
      timeslots: [],
      ...createConferenceDto,
    };

    jest.spyOn(service, 'create').mockResolvedValue(createdConference);

    const result = await controller.create(createConferenceDto);
    expect(service.create).toHaveBeenCalledWith(createConferenceDto);
    expect(result).toEqual(createdConference);
  });

  it('should update a conference successfully', async () => {
    const id = 1;

    const updateConferenceDto: UpdateConferenceDto = {
      title: 'AI Summit',
    };

    const updatedConference: Conference = {
      id: 1,
      timeslots: [],
      title: 'AI Summit',
    };

    jest.spyOn(service, 'update').mockResolvedValue(updatedConference);

    const result = await controller.update(id.toString(), updateConferenceDto);
    expect(service.update).toHaveBeenCalledWith(1, updateConferenceDto);
    expect(result).toEqual(updatedConference);
  });
});
