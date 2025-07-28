import { Injectable } from '@nestjs/common';
import { create_customer_dto } from './customer.dto';
@Injectable()
export class CustomerService {
    show(){
        return ['id' ,'123'];
    }
    create_customer(customer_dto : create_customer_dto , file : Express.Multer.File) : string{
            const {name , email,gender , phone_number , password , nid_number} = customer_dto ;
            return `Customer Created :\nName: ${name} \nEmail : ${email}\nGender : ${gender} \nPhone Number : ${phone_number} \nPassword : ${password} \nNID Number : ${nid_number} \nNID Image : ${file.originalname}`
        
    }

}

