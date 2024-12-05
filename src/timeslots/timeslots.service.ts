import { Inject, Injectable } from '@nestjs/common';
import { CreateTimeslotDto } from './dto/create-timeslot.dto';
import { UpdateTimeslotDto } from './dto/update-timeslot.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Timeslot } from './entities/timeslot.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TimeslotsService {
  constructor(
    @InjectRepository(Timeslot)
    private readonly timeslotsRepository: Repository<Timeslot>,
  ) {}

  create(createTimeslotDto: CreateTimeslotDto) {
    const timeslot = this.timeslotsRepository.create(createTimeslotDto);

    return this.timeslotsRepository.save(timeslot);
  }

  findAll() {
    return this.timeslotsRepository.find();
  }

  findOne(id: number) {
    return this.timeslotsRepository.findOneOrFail({
      where: { id },
      relations: { presentations: true },
    });
  }

  async update(id: number, updateTimeslotDto: UpdateTimeslotDto) {
    const timeslot = await this.findOne(id);

    const updatedTimeslot = this.timeslotsRepository.merge(
      timeslot,
      updateTimeslotDto,
    );

    return this.timeslotsRepository.save(updatedTimeslot);
  }

  remove(id: number) {
    return this.timeslotsRepository.delete(id);
  }
}
