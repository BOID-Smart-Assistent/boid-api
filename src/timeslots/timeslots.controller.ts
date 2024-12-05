import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TimeslotsService } from './timeslots.service';
import { CreateTimeslotDto } from './dto/create-timeslot.dto';
import { UpdateTimeslotDto } from './dto/update-timeslot.dto';

@Controller('timeslots')
export class TimeslotsController {
  constructor(private readonly timeslotsService: TimeslotsService) {}

  @Post()
  create(@Body() createTimeslotDto: CreateTimeslotDto) {
    return this.timeslotsService.create(createTimeslotDto);
  }

  @Get()
  findAll() {
    return this.timeslotsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.timeslotsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTimeslotDto: UpdateTimeslotDto) {
    return this.timeslotsService.update(+id, updateTimeslotDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.timeslotsService.remove(+id);
  }
}
