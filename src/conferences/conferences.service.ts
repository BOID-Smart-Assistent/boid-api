import { Injectable } from '@nestjs/common';
import { CreateConferenceDto } from './dto/create-conference.dto';
import { UpdateConferenceDto } from './dto/update-conference.dto';
import { Repository, In, Not } from 'typeorm';
import { Conference } from './entities/conference.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Timeslot } from '../timeslots/entities/timeslot.entity';
import {
  Schedule,
  Day,
  Timeslot as TimeslotProto,
  Presentation as PresentationProto,
} from 'BOID-model';
import { Presentation } from '../presentation/entities/presentation.entity';
import { ScheduleEntity } from '../user/entities/schedule.entity';
import { User } from '../user/entities/user.entity';

// type Timeslots = {
//   [key: string]: Presentation;
// };

// type Schedule = {
//   [key: string]: Timeslots;
// };

@Injectable()
export class ConferencesService {
  constructor(
    @InjectRepository(Conference)
    private readonly conferencesRepository: Repository<Conference>,
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Timeslot)
    private readonly timeslotRepository: Repository<Timeslot>,
  ) {}

  async create(createConferenceDto: CreateConferenceDto) {
    const conference = this.conferencesRepository.create(createConferenceDto);

    return this.conferencesRepository.save(conference);
  }

  findAll() {
    return this.conferencesRepository.find();
  }

  findOne(id: number) {
    return this.conferencesRepository.findOneOrFail({
      where: { id },
      relations: { timeslots: { presentations: true } },
    });
  }

  async update(id: number, updateConferenceDto: UpdateConferenceDto) {
    const conference = await this.findOne(id);

    const updatedConference = this.conferencesRepository.merge(
      conference,
      updateConferenceDto,
    );

    return this.conferencesRepository.save(updatedConference);
  }

  remove(id: number) {
    return this.conferencesRepository.delete(id);
  }

  async schedule(id: number): Promise<Schedule> {
    const conference = await this.findOne(id);

    const grouped: { [key: string]: Timeslot[] } = conference.timeslots.reduce(
      (acc, timeslot) => {
        const dateKey = timeslot.date.toISOString().split('T')[0]; // YYYY-MM-DD
        if (!acc[dateKey]) acc[dateKey] = [];
        acc[dateKey].push(timeslot);
        return acc;
      },
      {},
    );

    return Schedule.create({
      schedule: Object.keys(grouped).map((day) =>
        Day.create({
          date: day,
          timeslots: grouped[day].map((timeslot) =>
            TimeslotProto.create({
              id: timeslot.id,
              presentations: timeslot.presentations.map((presentation) =>
                PresentationProto.create({
                  id: presentation.id,
                  name: presentation.name,
                  topic: presentation.topic,
                }),
              ),
            }),
          ),
        }),
      ),
    });
  }

  async scheduleFromPresentationIds(ids: number[], userId: number) {
    const timeslots = await this.timeslotRepository
      .createQueryBuilder('timeslot')
      .select(['timeslot'])
      .leftJoinAndSelect('timeslot.presentations', 'presentation')
      .leftJoinAndSelect('timeslot.conference', 'conference')
      .where('presentation.id IN (:...ids)', { ids })
      .getMany();

    if (timeslots.length === 0) {
      throw new Error(
        'There are no timeslots related to provided the presentations!',
      );
    }

    const grouped = timeslots.reduce((acc, timeslot) => {
      const dateKey = timeslot.date.toISOString().split('T')[0]; // YYYY-MM-DD
      if (!acc[dateKey]) acc[dateKey] = [];
      acc[dateKey].push(timeslot);
      return acc;
    }, {});

    const schedule = Schedule.create({
      schedule: Object.keys(grouped).map((day) =>
        Day.create({
          date: day,
          timeslots: grouped[day].map((timeslot) =>
            TimeslotProto.create({
              id: timeslot.id,
              presentations: timeslot.presentations.map((presentation) =>
                PresentationProto.create({
                  id: presentation.id,
                  name: presentation.name,
                  topic: presentation.topic,
                }),
              ),
            }),
          ),
        }),
      ),
    });

    const entity = this.scheduleRepository.create();
    entity.conference = timeslots[0].conference;
    entity.schedule = schedule;
    entity.user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    await this.scheduleRepository.save(entity);

    return entity;
  }
}
