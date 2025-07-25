import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UploadedFile,
  UseInterceptors,
  Post,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService) {}
  @Get('dashboard')
  getDashboard(): string {
    return this.customerService.getDashboard();
  }
  @Get('users')
  getUsers(): string {
    return this.customerService.getUsers();
  }
  @Get('/search/:id')
  getUserById(@Param('id', ParseIntPipe) id: string): string {
    console.log(typeof id);
    return `User with ID: ${id}`;
  }
  @Get('/find')
  getUserByQuery(@Query('id', ParseIntPipe) id: number): string {
    console.log(typeof id);
    return `User with ID: ${id}`;
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/))
          cb(null, true);
        else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
        }
      },
      limits: { fileSize: 1000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: function (req, file, cb) {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    console.log(file);
  }
}
