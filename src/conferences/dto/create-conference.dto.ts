// export class CreateConferenceDto {}
import { Conference } from '../entities/conference.entity';
import { OmitType } from '@nestjs/mapped-types';

export class CreateConferenceDto extends OmitType(Conference, [
  'id',
  'timeslots',
] as const) {}

// export type CreateConferenceDto = Omit<Conference, 'id' | 'timeslots'>;
