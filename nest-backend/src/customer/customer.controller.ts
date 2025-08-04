import { BadRequestException, Body, Controller, Get, Param, Post , Res, UploadedFile , UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { create_customer_dto } from './customer.dto';
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
    @Get("id")
    fun(){
        return this.customerService.show();
    }

    /*@Post()
    create_customer(@Body() customer_dto : create_customer_dto){
        return this.customerService.create_customer(customer_dto)
    }*/
    @Post('add_customer')
    @UsePipes(new ValidationPipe())
    @UseInterceptors(FileInterceptor('file',{
        fileFilter : (req,file,cb)=>{
            if(file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)){
                cb(null,true);
            }else{
                cb(new MulterError('LIMIT_UNEXPECTED_FILE','image'),false);
            }
        },
        limits:{ fileSize : 1024},
        storage : diskStorage({
            destination : './uploads',
            filename : function(req,file,cb){
                cb(null,Date.now()+"_"+file.originalname)
            },
        
        })
    }))
        async add_customer(
            @Body() customer_dto : create_customer_dto,
            @UploadedFile() file : Express.Multer.File){
        if(!file){
            throw new BadRequestException("NID image is required and must be less than 1MB");

        }else{
           // console.log(file.originalname);
            return this.customerService.create_customer(customer_dto , file);
            
        }
    }
    @Get('file/:name')
    get_file(@Param('name') name,@Res() res){
        res.sendFile(name,{root: './uploads'})
    }

    @Post('create')
    @UsePipes(new ValidationPipe({transform : true}))
    async create_customer(@Body() customer_db_dto : customer_db_dto) {
        const result = await this.customerService.add_customer(customer_db_dto);
        return {
            status : 'success',
            message : 'Customer Successfully Created' ,
            date : {
                id : result.id ,
                unique_id : result.uniqueId ,
                country : result.country,
                joiningDate : result.joiningDate,

            }
        }
    

    }
    @Post('update_country')
    @UsePipes(new ValidationPipe())
    async update_country(@Body() body : {id : number , country : string}){
        const result =  await this.customerService.update_country(body.id,body.country);
        return {
            status : 'success' ,
            message : 'Country Has been updated Successfully',
            date : {
                id : result.id ,
                unique_id : result.uniqueId ,
                country : result.country,
                joiningDate : result.joiningDate,

            }

        }
    }

    @Get('get_customer_by_date/:date')
    async get_user_by_date(@Param('date') date : string){
        const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
        if (!dateRegex.test(date)) {
            throw new BadRequestException({
        status: 'failed',
        message: 'Invalid date format. Use YYYY-MM-DD',
        statusCode: 400
    });
}
        const parsedDate = new Date(date);
        if (isNaN(parsedDate.getTime())) {
            throw new BadRequestException({
                status : 'failed',
                message : 'Invalid date format. Use YYYY-MM-DD',
                statusCode : 400

               
            });
        }

        const result = await this.customerService.get_user_by_date(date);
        if(result.length===0){
            return {
                status : 'failed',
                message : `No Customer Found on ${date}`,
                total : result.length,
                target_date : date ,

            }
        }
        return {
            status : 'success',
            message : `Found ${result.length} Customer on ${date}` ,
            total : result.length,
            //date : date+'T23:59:59.999',
            target_date : date,
            data : result[0]
        };
    }
    @Get('get_customer_by_country/:country')
    async get_user_by_country(@Param('country') country : string){
        const result  =  await this.customerService.get_user_by_country(country) ;
        return {
            status : 'success',
            message : `Found ${result.length} Customer for ${country}` ,
            total : result.length,
            //date : date+'T23:59:59.999',
            target_country : country,
            data : result
        }
    }
    @Get('get_customer_by_country')
    async get_user_by_defult_country(){
        const result  =  await this.customerService.get_user_by_country('Unknown') ;
        return {
            status : 'success',
            message : `Found ${result.length} Customer for ${'Unknown'}` ,
            total : result.length,
            target_country : 'Unknown',
            data : result
        }
    }




    

    

}
