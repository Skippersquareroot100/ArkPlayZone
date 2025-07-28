import { Injectable } from '@nestjs/common';
import { create_customer_dto } from './customer.dto';
@Injectable()
export class CustomerService {
    show(){
        return ['id' ,'123'];
    }
    create_customer(customer_dto : create_customer_dto , file : Express.Multer.File) : string{
            const {name , email , password , nid_number} = customer_dto ;
            return `Customer Created :\n  Name: ${name} \n Email : ${email} \n Password : ${password} \n  NID Number : ${nid_number} \n NID Image : ${file.originalname}`
        
    }

}

