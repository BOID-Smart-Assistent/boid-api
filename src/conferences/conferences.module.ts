import { Module } from '@nestjs/common';
import { ConferencesService } from './conferences.service';
import { ConferencesController } from './conferences.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conference } from './entities/conference.entity';
import { Presentation } from '../presentation/entities/presentation.entity';
import { Timeslot } from '../timeslots/entities/timeslot.entity';
import { User } from '../user/entities/user.entity';
import { ScheduleEntity } from '../user/entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Conference,
      Presentation,
      Timeslot,
      User,
      ScheduleEntity,
    ]),
  ],
  controllers: [ConferencesController],
  providers: [ConferencesService],
  exports: [ConferencesService],
})
export class ConferencesModule {}
