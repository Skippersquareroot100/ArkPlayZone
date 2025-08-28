import {
  Body,
  Controller,
  Put,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdateStaffDTO } from '../DTOs/updateStaff.dto';
import { UpdateStaffService } from '../services/updateStaff.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('manager')
export class ManagerPUTController {
  constructor(private readonly updateStaffService: UpdateStaffService) {}
  @Put()
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|pdf)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false);
        }
      },
      limits: { fieldSize: 30000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  async updateManager(
    @Body() data: UpdateStaffDTO,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (file) {
      data.file = file.filename;
    }
    await this.updateStaffService.updateStaff(data);
  }
}
