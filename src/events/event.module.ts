import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { PresentationModule } from '../presentation/presentation.module';
import { Presentation } from '../presentation/entities/presentation.entity';
import { EventsGateway } from './events.gateway';
import { ConferencesModule } from '../conferences/conferences.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Presentation]),
    PresentationModule,
    ConferencesModule,
  ],
  controllers: [EventsController],
  providers: [EventsService, EventsGateway],
  exports: [EventsGateway],
})
export class EventModule {}
