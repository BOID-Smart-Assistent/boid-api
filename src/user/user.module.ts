import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { ConfigModule } from '@nestjs/config';
import { SerpApiService } from './serp-api.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { ConferencesModule } from '../conferences/conferences.module';
import { EventModule } from '../events/event.module';
import { ScheduleEntity } from './entities/schedule.entity';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User, ScheduleEntity]),
    ConferencesModule,
    EventModule,
  ],
  controllers: [UserController],
  providers: [UserService, SerpApiService],
})
export class UserModule {}
