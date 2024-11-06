import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Render,
} from '@nestjs/common';
import { UpdatePresentationDto } from '../presentation/dto/update-presentation.dto';
import { EventsService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { PresentationService } from '../presentation/presentation.service';

@Controller('event')
export class EventsController {
  constructor(
    private readonly eventService: EventsService,
    private readonly presentationService: PresentationService,
  ) {}

  @Post()
  create(@Body() createEventDto: CreateEventDto) {
    return this.eventService.create(createEventDto);
  }

  @Get('api')
  async findAll() {
    return this.eventService.findAll();
  }

  @Get('api/:id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(+id);
  }

  @Get('api/user/:id')
  findUser(@Param('id') id: string) {
    return this.eventService.findUser(+id);
  }

  @Patch('api/:id')
  update(
    @Param('id') id: string,
    @Body() updatePresentationDto: UpdatePresentationDto,
  ) {
    return this.eventService.update(+id, updatePresentationDto);
  }

  @Delete('api/:id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(+id);
  }

  @Get(':id')
  @Render('event')
  async renderEvent(@Param('id') userId: string) {
    return {
      presentations:
        await this.presentationService.findPresentationsWithoutEventsForUser(
          +userId,
        ),
    };
  }
}
