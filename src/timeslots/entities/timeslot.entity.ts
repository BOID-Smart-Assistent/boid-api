import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Presentation } from '../../presentation/entities/presentation.entity';
import { Conference } from '../../conferences/entities/conference.entity';

@Entity()
export class Timeslot {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp' })
  date: Date;

  @OneToMany(() => Presentation, (presentation) => presentation.timeslot)
  presentations: Presentation[];

  @ManyToOne(() => Conference, (conference) => conference.timeslots)
  conference: Conference;
}
