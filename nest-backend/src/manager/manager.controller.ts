import {
  Body,
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { NameDto } from './DTOs/name.dto';

import { StaffDto } from './DTOs/staff.dto';
import { Response } from 'express';
import { diskStorage, MulterError } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';

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
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|pdf)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false);
        }
      },
      limits: { fileSize: 30000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  async createStaff(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: StaffDto,
  ) {
    try {
      // If a file was uploaded, override dto.file with actual filename
      if (file) {
        dto.file = file.filename;
      }

      return await this.managerService.createStaff(dto, dto.file ?? '');
    } catch (e) {
      console.log('Validation Error:', e);
      throw e;
    }
  }
}
