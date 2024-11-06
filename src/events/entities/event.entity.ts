import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Presentation } from '../../presentation/entities/presentation.entity';

export enum EventType {
  LIKE,
  DISLIKE,
}

@Entity()
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventType: EventType;

  @Column()
  userId: number;

  @ManyToOne(() => Presentation, (presentation) => presentation.events, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  presentation: Presentation;
}
