import { Controller, Get, Param } from '@nestjs/common';
import { BoidService } from './boid.service';

@Controller('boid')
export class BoidController {
  constructor(private readonly boidService: BoidService) {}

  @Get('schedule/:userId')
  schedule(@Param('userId') id: string) {
    return this.boidService.schedule(+id);
  }
}
