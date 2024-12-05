import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './events/events.gateway';
import { PresentationModule } from './presentation/presentation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presentation } from './presentation/entities/presentation.entity';
import { Event } from './events/entities/event.entity';
import { EventModule } from './events/event.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { User } from './user/entities/user.entity';
import { ConferencesModule } from './conferences/conferences.module';
import { Conference } from './conferences/entities/conference.entity';
import { TimeslotsModule } from './timeslots/timeslots.module';
import { Timeslot } from './timeslots/entities/timeslot.entity';
import { BoidModule } from './boid/boid.module';
import { ScheduleEntity } from './user/entities/schedule.entity';

@Module({
  imports: [
    ConfigModule.forRoot(),

    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'boid',
      password: 'boid',
      database: 'boid',
      entities: [
        Presentation,
        Event,
        User,
        Conference,
        Timeslot,
        ScheduleEntity,
      ],
      synchronize: true,
    }),

    PresentationModule,
    EventModule,
    UserModule,
    ConferencesModule,
    TimeslotsModule,
    BoidModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
