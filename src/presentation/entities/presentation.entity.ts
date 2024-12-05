import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Event } from '../../events/entities/event.entity';
import { Timeslot } from '../../timeslots/entities/timeslot.entity';

@Entity()
export class Presentation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  topic: string;

  @OneToMany(() => Event, (event) => event.presentation)
  events: Event[];

  @ManyToOne(() => Timeslot, (timeslot) => timeslot.presentations)
  timeslot: Timeslot;
}
