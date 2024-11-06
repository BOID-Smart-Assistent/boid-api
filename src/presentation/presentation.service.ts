import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { UpdatePresentationDto } from './dto/update-presentation.dto';
import { Presentation } from './entities/presentation.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PresentationService {
  constructor(
    @InjectRepository(Presentation)
    private readonly presentationsRepository: Repository<Presentation>,
  ) {}

  create(createPresentationDto: CreatePresentationDto) {
    return this.presentationsRepository.save(createPresentationDto);
  }

  findAll() {
    return this.presentationsRepository.find();
  }

  findOne(id: number) {
    return this.presentationsRepository.findOneBy({ id });
  }

  async update(id: number, updatePresentationDto: UpdatePresentationDto) {
    let entity = await this.presentationsRepository.findOneBy({ id });

    if (!entity) {
      throw new NotFoundException();
    }

    entity = Object.assign(entity, updatePresentationDto);

    return this.presentationsRepository.save(entity);
  }

  remove(id: number) {
    return this.presentationsRepository.delete(id);
  }

  async findPresentationsWithoutEventsForUser(
    userId: number,
  ): Promise<Presentation[]> {
    return this.presentationsRepository
      .createQueryBuilder('presentation')
      .leftJoinAndSelect(
        'presentation.events',
        'event',
        'event.userId = :userId',
        { userId },
      )
      .where('event.id IS NULL')
      .getMany();
  }
}
