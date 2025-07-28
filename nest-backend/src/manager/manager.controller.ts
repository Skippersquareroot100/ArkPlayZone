import {
  BadRequestException,
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Res,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { NameDto } from './DTOs/name.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { StaffDto } from './DTOs/staff.dto';
import { Response } from 'express';
import * as fs from 'fs';
import * as path from 'path';

@Controller('manager')
export class ManagerController {
  constructor(private readonly managerService: ManagerService) {}

  @Post('create-name')
  @UsePipes(new ValidationPipe())
  createName(@Body() data: NameDto) {
    this.managerService.createName(data);
  }

  @Post('create-staff')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('photo', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(pdf)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 120000 },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  async createStaff(
    @UploadedFile() photo: Express.Multer.File,
    @Body() data: StaffDto,
  ) {
    if (!photo) {
      throw new BadRequestException('Photo file is required');
    }
    const photoFilename = photo.filename;
    await this.managerService.createStaff(data, photoFilename);

    return { message: 'Staff created successfully' };
  }

  @Get('/staff-photo/:id')
  async getStaffPhoto(@Param('id') id: string, @Res() res: Response) {
    try {
      const filename = await this.managerService.getStaffPhoto(id);

      const filePath = path.join(process.cwd(), 'uploads', filename);

      if (!fs.existsSync(filePath)) {
        throw new NotFoundException('File not found');
      }

      res.sendFile(filename, { root: './uploads' });
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}
