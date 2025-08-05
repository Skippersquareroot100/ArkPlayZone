import { BadRequestException, Body, Controller, Get, Param, Post , Res, UploadedFile , UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { address_dto, create_customer_dto } from './customer.dto';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';
import { customer_db_dto } from './customer_2.dto';
import { customer_Entity } from './customer.entity';
import { totalmem } from 'os';


@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService : CustomerService){

    }
//     @Get('send_test_mail')
//   async sendTestMail(): Promise<string> {
//     return this.customerService.send_otp('barua.tv.home@gmail.com');
//     }
    @Post('account/verify')
     async verify_account(@Body() otp_data : string ){

        return this.customerService.verify_account(otp_data['otp'],otp_data['key']);
        
     }


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
        async add_customer(
            @Body() customer_dto : create_customer_dto,
            @Body() addressDto: address_dto,
            @UploadedFile() file : Express.Multer.File){
            return await this.customerService.register_customer(customer_dto, addressDto , file);
            
    }



    

    

}
