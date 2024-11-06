import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Event } from '../../events/entities/event.entity';

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
}
