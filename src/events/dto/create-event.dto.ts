import { EventType } from '../entities/event.entity';

export class CreateEventDto {
  eventType: EventType;
  userId: number;
  presentationId: number;
}
