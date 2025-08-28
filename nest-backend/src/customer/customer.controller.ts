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
  Patch,
  Delete,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { customer_dto } from './customer.dto';
import { MailService } from '../mailer/mailer.service';
import { Customer } from './entities/customer.entity';
import e from 'express';
import { customer_session_guard } from './customer_auth/customer.guard';

@Controller('customer')
export class CustomerController {
  constructor(private readonly customerService: CustomerService ,
    private readonly mail_service : MailService
  ) {}
  //1
  @Get('all_customers')
  async get_all_customer() {
    const customers = await this.customerService.get_all_customer();
    if (customers.length === 0) {
      return {
        status: 'error',
        message: 'No customers found',
      };
    }else{
      // const customer_data = customers.map((customer) => {
      //   return {
      //     name : customer.name.firstName + ' ' + customer.name.middleName + ' ' + customer.name.lastName,
          
        
      //   };
      // });
      return {
        status: 'success',
        message: 'Customers retrieved successfully',
        total: customers.length,
        data: customers,
      };
    
    }
  }

  @Get('/search/:id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.customerService.get_customer_by_id(id);
  }

  
  // @Post('test')
  // test_email(@Body('email') email : string){
  //    return this.mail_service.send_email_with_text(email, 'Test Subject', 'This is a test email');
  // }
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
              try{
                return await this.customerService.register_customer(customer_dto, file);
              }catch(e){
                if(e.code=== '23505'){
                  return {
                    status: 'error',
                    message: `Email ${customer_dto.email} already exists`,
                  };
              }
            }
            //return await this.customerService.register_customer(customer_dto, file);
            
    }
    @Post('verify')
    async verify_customer(
        @Body() otp_data: string,
  
    ) {
        const  resp = await this.customerService.verify_customer(otp_data['otp_signature'], otp_data['otp']);
        return {
            otp_sig : otp_data['otp_signature'],
            otp : otp_data['otp'],
            resp : resp
            
        };
        
    }
    @Post('login')
    async login_customer(
        @Body() login_data: { email: string; password: string},
        @Req() req: any
    ) {
      return await this.customerService.login_customer(login_data.email, login_data.password,req);

    }

    @Post('forgot_password')
    async customer_forgot_password(
      @Body('email') email: string,
    ) {
      return await this.customerService.customer_forget_password(email);
    }

    @UseGuards(customer_session_guard)
    @Patch('reset_password')
    async reset_password(
      @Body() reset_data: { otp_signature: string; otp: number; password: string },
    ) {
      return await this.customerService.reset_password(
        reset_data.otp_signature,
        reset_data.otp,
        reset_data.password,
      );
    }
    @Delete('delete/:id')
    async delete_customer(@Param('id', ParseIntPipe) id: number) {
      return await this.customerService.delete_customer(id);
    }

    @UseGuards(customer_session_guard)
    @Put('update/:id')
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
            }
        })
    }))
    async update_customer(
      @Param('id', ParseIntPipe) id: number,
      @Body() customer_dto: customer_dto,
      @UploadedFile() file: Express.Multer.File,
    ) {
      return await this.customerService.update_customer(id, customer_dto, file);
    }

    @UseGuards(customer_session_guard)
    @Get('logout')
    logout(@Req() req) {
    req.session.destroy();
    return { message: 'Logged out successfully' };
  }


  
}
