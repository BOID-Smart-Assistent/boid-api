import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { SerpApiService } from './serp-api.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { ConferencesService } from '../conferences/conferences.service';
import { LlmInput, User as UserProto } from 'BOID-model';
import { EventsGateway } from '../events/events.gateway';
import { ScheduleEntity } from './entities/schedule.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly serpApiService: SerpApiService,
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly conferenceService: ConferencesService,
    private readonly websocket: EventsGateway,
    @InjectRepository(ScheduleEntity)
    private readonly scheduleRepository: Repository<ScheduleEntity>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const profile = await this.serpApiService.getProfile(createUserDto.name);

    const user = this.userRepository.create();
    user.name = profile.name;
    user.interests = profile.interests.map(
      (interest: { title: string }) => interest.title,
    );
    user.scholarProfile = profile.link;

    await this.userRepository.save(user);

    return user;
  }

  findAll() {
    return this.userRepository.find();
  }

  findOne(id: number) {
    return this.userRepository.findOneOrFail({ where: { id } });
  }

  async remove(id: number) {
    const user = await this.userRepository.findOneOrFail({ where: { id } });

    return this.userRepository.remove(user);
  }

  async postSchedule(userId: number, conferenceId: number) {
    const schedule = await this.conferenceService.schedule(conferenceId);
    const user = await this.userRepository.findOneOrFail({
      where: { id: userId },
    });

    const userProto = UserProto.create({
      obligations: user.obligations,
      interests: user.interests,
      preferredSpeakers: user.preferredSpeakers,
      ...user,
    });

    this.websocket.sendLLMInput(LlmInput.create({ schedule, user: userProto }));

    return { message: 'Send info to LLM' };
  }

  getSchedule(userId: number, conferenceId: number) {
    return this.scheduleRepository.find({
      where: { user: { id: userId }, conference: { id: conferenceId } },
    });
  }
}
