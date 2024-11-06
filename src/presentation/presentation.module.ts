import { Module } from '@nestjs/common';
import { PresentationService } from './presentation.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presentation } from './entities/presentation.entity';
import { PresentationController } from './presentation.controller';
import { Event } from '../events/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Presentation, Event])],
  controllers: [PresentationController],
  providers: [PresentationService],
  exports: [PresentationService],
})
export class PresentationModule {}
