import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { create_customer_dto } from './customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { customer_Entity } from './customer.entity';
import { customer_db_dto } from './customer_2.dto';
import { Repository , Between } from 'typeorm';
@Injectable()
export class CustomerService {
    constructor(@InjectRepository(customer_Entity) private customer_repository : Repository <customer_Entity>){}

    show(){
        return ['id' ,'123'];
    }
    
    create_customer(customer_dto : create_customer_dto , file : Express.Multer.File) : string{
            const {name , email,gender , phone_number , password , nid_number} = customer_dto ;
            return `Customer Created :\nName: ${name} \nEmail : ${email}\nGender : ${gender} \nPhone Number : ${phone_number} \nPassword : ${password} \nNID Number : ${nid_number} \nNID Image : ${file.originalname}`
        
    }
    async add_customer(customer_db_dto : customer_db_dto) : Promise<customer_Entity>{
        const new_customer = this.customer_repository.create({
            country : customer_db_dto.country,
        });
        return this.customer_repository.save(new_customer);
    }
    async is_exist(id : number) : Promise<{status : boolean; user?:customer_Entity}>{
        const user = await this.customer_repository.findOneBy({id})

        if(user){
            return {
                status : true ,
                user : user 
            }
        }else{
            return {
                status : false ,
                user : undefined 
            }
        }

    }
    async update_country(id : number , country : string) : Promise<customer_Entity>{
        const customer = await this.is_exist(id) ;
        if(customer.status && customer.user){
            if (!country || country.trim() === '') {
                    country = 'Unknown';
            }
            customer.user.country =country;
            return this.customer_repository.save(customer.user)
        }else{
            throw new NotFoundException({
                status : 'failed',
                message : `User Not Found With This ID : ${id}`
            });
        }

    }

    async get_user_by_date(date : string) : Promise<customer_Entity[]>{
        const starting_time = new Date(date+"T00:00:00")
        const ending_time = new Date(date+"T23:59:59.999")
        return await this.customer_repository.find({
            where : {joiningDate : Between(starting_time,ending_time)},
            order : {id : 'ASC'}
        });
        
    }
    async get_user_by_country(country : string) : Promise<customer_Entity[]>{
        
        return await this.customer_repository.find({
            where : {country : country}
        });

        
    }
    


}

