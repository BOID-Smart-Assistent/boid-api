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
import { PresentationService } from './presentation.service';
import { CreatePresentationDto } from './dto/create-presentation.dto';
import { Presentation } from './entities/presentation.entity';

@Controller('presentation')
export class PresentationController {
  constructor(private readonly presentationService: PresentationService) {}

  @Post()
  create(@Body() createPresentationDto: CreatePresentationDto) {
    return this.presentationService.create(createPresentationDto);
  }

  @Get()
  @Render('presentation')
  async findAll(): Promise<{ presentations: Presentation[] }> {
    return { presentations: await this.presentationService.findAll() };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.presentationService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePresentationDto: UpdatePresentationDto,
  ) {
    return this.presentationService.update(+id, updatePresentationDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.presentationService.remove(+id);
  }
}
