import { BadRequestException, Body, Controller, Get, Param, Post , Res, UploadedFile , UseInterceptors } from '@nestjs/common';
import { create_customer_dto } from './customer.dto';
import { CustomerService } from './customer.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';


@Controller('customer')
export class CustomerController {
    constructor(private readonly customerService : CustomerService){

    }
    @Get("id")
    fun(){
        return this.customerService.show();
    }

    /*@Post()
    create_customer(@Body() customer_dto : create_customer_dto){
        return this.customerService.create_customer(customer_dto)
    }*/
    @Post('add_customer')
    @UseInterceptors(FileInterceptor('file',{
        fileFilter : (req,file,cb)=>{
            if(file.originalname.match(/^.*\.(jpg|webp|png|jpeg|txt)$/)){
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
            @Body() customer_dto,
            @UploadedFile() file : Express.Multer.File){
        if(!file){
            throw new BadRequestException("NID image is required and must be less than 2MB");

        }else{
           // console.log(file.originalname);
            return this.customerService.create_customer(customer_dto , file);
            
        }
    }
    @Get('file/:name')
    get_file(@Param('name') name,@Res() res){
        res.sendFile(name,{root: './uploads'})
    }

    

}
