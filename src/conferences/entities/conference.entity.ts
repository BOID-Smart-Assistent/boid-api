import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Timeslot } from '../../timeslots/entities/timeslot.entity';
import { ScheduleEntity } from '../../user/entities/schedule.entity';

@Entity()
export class Conference {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @OneToMany(() => Timeslot, (timeslot) => timeslot.conference)
  timeslots: Timeslot[];

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.conference)
  schedules: ScheduleEntity[];
}
