import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EventsService } from './events.service';
import { Event } from './entities/event.entity';
import { PresentationModule } from '../presentation/presentation.module';
import { Presentation } from '../presentation/entities/presentation.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Event, Presentation]),
    PresentationModule,
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventModule {}
