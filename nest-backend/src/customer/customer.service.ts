import { Injectable } from '@nestjs/common';
import { customer_dto } from './customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerAddress } from './entities/customeraddress.entity';
import { CustomerStreet } from './entities/customerstreet.entity';
import { CustomerName} from './entities/customername.entity'
import { CustomerProfile} from './entities/customerprofile.entity'
import { CustomerCredentials} from './entities/customercredentials.entity'
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { customer_otp } from './entities/cutomerOTP.entity';
import { CustomerOtpService } from './customer_otp/customer_otp.service';

@Injectable()
export class CustomerService {
  constructor(
    @InjectRepository(CustomerAddress)
    private address_repository: Repository<CustomerAddress>,
    @InjectRepository(CustomerStreet)
    private street_repository: Repository<CustomerStreet>,
    @InjectRepository(CustomerName)
    private customer_name_repository : Repository<CustomerName>,
    @InjectRepository(CustomerProfile)
    private customer_profile_repository : Repository<CustomerProfile>,
    @InjectRepository(CustomerCredentials)
    private credential_repository : Repository<CustomerCredentials>,
    @InjectRepository(Customer)
    private customer_repository: Repository<Customer>,
    @InjectRepository(customer_otp)
    private customer_otp_repository: Repository<customer_otp>,
    private readonly otp_service: CustomerOtpService,
  ) {}
  getDashboard(): string {
    return 'Customer Dashboard';
  }
  getUsers(): string {
    return 'List of Customers';
  }
  getUserById(id: string): string {
    return `User with ID: ${id}`;
  }
  //// -------
  async register_customer(
    customer_dto: customer_dto,
    file?: Express.Multer.File,
  ) {
    const new_street = this.street_repository.create({
      street_no: customer_dto.street_no,
      street_name: customer_dto.street_name,
      apartment_name: customer_dto.apartment_name,
    });
    const street = await this.street_repository.save(new_street);
    const new_address = this.address_repository.create({
      city: customer_dto.city,
      postal_code: customer_dto.postal_code,
      street: street,
    });

    const address = await this.address_repository.save(new_address)
    const new_name = this.customer_name_repository.create({
      firstName : customer_dto.first_name,
      middleName : customer_dto.middle_name,
      lastName : customer_dto.last_name
    });
    const name = await this.customer_name_repository.save(new_name);
    const profile = await this.customer_profile_repository.save(this.customer_profile_repository.create({
      loyality_points : 0
    }));

    const credentials = await this.credential_repository.save(this.credential_repository.create({
      password : customer_dto.password,
      username : customer_dto.username,
      profile_photo : file?.path || './media/default_profile_photo.png'
    }));
    const customer =  this.customer_repository.create({
        email: customer_dto.email,
        phone: customer_dto.phone_number,
        name: name,
        address: address,
        profile: profile,
        credentials: credentials,
    });
    
    const new_customer = await this.customer_repository.save(customer);
    const otp_resp = await this.otp_service.send_otp(new_customer.email);
    if((otp_resp).status === 'success'){
      const new_otp = this.customer_otp_repository.create({
        customer_id: new_customer,
        otp_key : otp_resp.otp,
      })
      const otp_entry = await this.customer_otp_repository.save(new_otp);

      return{
        status: 'success',
        message: 'Customer registered successfully,Plaease verify your email',
        otp_signature: otp_entry.otp_signature,
      }
        
    }else{
      return {
        status: 'error',
        message: 'Failed to send OTP',
      };
    }

  }

  async verify_customer(otp_signature : string , otp : number){
    const resp =  await this.otp_service.verify_otp(otp_signature,otp);
    return resp;
  }
}
