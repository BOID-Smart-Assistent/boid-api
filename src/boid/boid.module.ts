import { Module } from '@nestjs/common';
import { BoidService } from './boid.service';
import { BoidController } from './boid.controller';
import { HttpModule } from '@nestjs/axios';
import { EventsGateway } from '../events/events.gateway';
import { EventModule } from '../events/event.module';

@Module({
  imports: [HttpModule, EventModule],
  controllers: [BoidController],
  providers: [BoidService],
})
export class BoidModule {}
