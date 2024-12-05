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
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Render('users')
  async findAll() {
    return { users: await this.userService.findAll() };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }

  @Post('/schedule/:userId/:conferenceId')
  postSchedule(
    @Param('userId') userId: string,
    @Param('conferenceId') conferenceId: string,
  ) {
    return this.userService.postSchedule(+userId, +conferenceId);
  }

  @Get('/schedule/:userId/:conferenceId')
  @Render('schedules')
  async getSchedule() {
    return;
  }

  @Get('/api/schedule/:userId/:conferenceId')
  getScheduleApi(
    @Param('userId') userId: string,
    @Param('conferenceId') conferenceId: string,
  ) {
    return this.userService.getSchedule(+userId, +conferenceId);
  }
}
