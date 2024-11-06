import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { Event } from './entities/event.entity';
import { Presentation } from '../presentation/entities/presentation.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private readonly eventRepository: Repository<Event>,
    @InjectRepository(Presentation)
    private readonly presentationRepository: Repository<Presentation>,
  ) {}

  async create(createPresentationDto: CreateEventDto) {
    const presentation = await this.presentationRepository.findOneBy({
      id: createPresentationDto.presentationId,
    });

    const event = this.eventRepository.create({
      ...createPresentationDto,
      presentation,
    });

    return this.eventRepository.save(event);
  }

  findAll() {
    return this.eventRepository.find();
  }

  findOne(id: number) {
    return this.eventRepository.findOneBy({ id });
  }

  async update(id: number, updatePresentationDto: any) {
    let entity = await this.eventRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException();
    }

    entity = Object.assign(entity, updatePresentationDto);

    return this.eventRepository.save(entity);
  }

  remove(id: number) {
    return this.eventRepository.delete(id);
  }
}
