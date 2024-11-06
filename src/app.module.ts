import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { EventsGateway } from './events/events.gateway';
import { PresentationModule } from './presentation/presentation.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Presentation } from './presentation/entities/presentation.entity';
import { Event } from './events/entities/event.entity';
import { EventModule } from './events/event.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'database',
      port: 3306,
      username: 'boid',
      password: 'boid',
      database: 'boid',
      entities: [Presentation, Event],
      synchronize: true,
    }),

    PresentationModule,
    EventModule,
  ],
  controllers: [AppController],
  providers: [AppService, EventsGateway],
})
export class AppModule {}
