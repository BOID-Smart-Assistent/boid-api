import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ScheduleEntity } from './schedule.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text')
  _obligations: string = '';

  get obligations(): string[] {
    return this._obligations ? this._obligations.split(',') : [];
  }

  set obligations(value: string[]) {
    this._obligations = value?.join(',') || '';
  }

  @Column('text')
  _interests: string = '';

  get interests(): string[] {
    return this._interests ? this._interests.split(',') : [];
  }

  set interests(value: string[]) {
    this._interests = value?.join(',') || '';
  }

  @Column('text')
  _preferredSpeakers: string = '';

  get preferredSpeakers(): string[] {
    return this._preferredSpeakers ? this._preferredSpeakers.split(',') : [];
  }

  set preferredSpeakers(value: string[]) {
    this._preferredSpeakers = value?.join(',') || '';
  }

  @Column({ nullable: true })
  affiliations?: string;

  @Column({ nullable: true })
  role?: string;

  @Column({ type: 'text' })
  scholarProfile: string;

  @OneToMany(() => ScheduleEntity, (schedule) => schedule.user)
  schedules: ScheduleEntity[];
}
