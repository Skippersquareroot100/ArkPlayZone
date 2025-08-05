import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { NameDto } from './DTOs/name.dto';

import { StaffDto } from './DTOs/staff.dto';
import { Response } from 'express';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('create-name')
  @UsePipes(new ValidationPipe())
  createName(@Body() data: NameDto) {
    this.managerService.createName(data);
  }

  @Get('hello')
  getHello(): string {
    return 'Hello from ManagerController!';
  }

  @Post('/hello')
  hello() {
    console.log('Hello from ManagerController!');
  }

  @Post('create-staff')
  //@UsePipes(new ValidationPipe())
  async create(@Body() dto: StaffDto) {
    try {
      const photoFilename = 'hello.pdf';
      return await this.managerService.createStaff(dto, photoFilename);
    } catch (e) {
      console.log('Validation Error:', e);
      throw e;
    }
  }
  
}
