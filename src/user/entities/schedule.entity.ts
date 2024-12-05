import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Schedule } from 'BOID-model';
import { User } from './user.entity';
import { Conference } from '../../conferences/entities/conference.entity';

@Entity()
export class ScheduleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'blob',
    transformer: {
      to: (value: Schedule) => Buffer.from(Schedule.encode(value).finish()),
      from: (value: Buffer) => Schedule.decode(value),
    },
  })
  schedule: Schedule;

  @ManyToOne(() => User, (user) => user.schedules)
  user: User;

  @ManyToOne(() => Conference, (conference) => conference.schedules)
  conference: Conference;

  @CreateDateColumn()
  created: Date;
}
