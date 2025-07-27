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
import { Name } from './entities/name.entity';
@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('create-name')
  @UsePipes(new ValidationPipe())
  createName(@Body() data: NameDto) {
    this.managerService.createName(data);
  }
}
