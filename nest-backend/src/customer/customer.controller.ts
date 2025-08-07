import {
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Query,
  UploadedFile,
  UseInterceptors,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { customer_dto } from './customer.dto';

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

  // register a customer
  @Post('register')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('file',{
        fileFilter : (req,file,cb)=>{
            if(file.originalname.match(/^.*\.(jpg|JPG|webp|png|jpeg)$/)){
                cb(null,true);
            }else{
                cb(new MulterError('LIMIT_UNEXPECTED_FILE','image'),false);
            }
        },
        limits:{ fileSize : 2*1024*1024},
        storage : diskStorage({
            destination : './uploads',
            filename : function(req,file,cb){
                cb(null,Date.now()+"_"+file.originalname)
            },
        
        })
    }))
        async register_customer(
            @Body() customer_dto : customer_dto,
            @UploadedFile() file : Express.Multer.File){
            return await this.customerService.register_customer(customer_dto, file);
            
    }

  
}
