import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { customer_dto } from './customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { CustomerAddress } from './entities/customeraddress.entity';
import { CustomerStreet } from './entities/customerstreet.entity';
import { CustomerName } from './entities/customername.entity';
import { CustomerProfile } from './entities/customerprofile.entity';
import { CustomerCredentials } from './entities/customercredentials.entity';
import { Customer } from './entities/customer.entity';
import { Repository } from 'typeorm';
import { customer_otp } from './entities/cutomerOTP.entity';
import { CustomerOtpService } from './customer_otp/customer_otp.service';
import { MailService } from 'src/mailer/mailer.service';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class CustomerService {
  constructor(
    private readonly mailService: MailService,
    @InjectRepository(CustomerAddress)
    private address_repository: Repository<CustomerAddress>,
    @InjectRepository(CustomerStreet)
    private street_repository: Repository<CustomerStreet>,
    @InjectRepository(CustomerName)
    private customer_name_repository: Repository<CustomerName>,
    @InjectRepository(CustomerProfile)
    private customer_profile_repository: Repository<CustomerProfile>,
    @InjectRepository(CustomerCredentials)
    private credential_repository: Repository<CustomerCredentials>,
    @InjectRepository(Customer)
    private customer_repository: Repository<Customer>,
    @InjectRepository(customer_otp)
    private customer_otp_repository: Repository<customer_otp>,
    private readonly otp_service: CustomerOtpService,
    private readonly auth_service: AuthService,
  ) {}
  getDashboard(): string {
    return 'Customer Dashboard';
  }
  async get_all_customer(): Promise<Customer[]> {
    return this.customer_repository.find({
      relations: ['name', 'address', 'profile', 'credentials'],
    });
  }
  getUserById(id: string): string {
    return `User with ID: ${id}`;
  }
  //// -------
  async register_customer(
    customer_dto: customer_dto,
    file?: Express.Multer.File,
  ) {
    const hashed_password = await this.auth_service.hash_password(
      customer_dto.password,
    );
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

    const address = await this.address_repository.save(new_address);
    const new_name = this.customer_name_repository.create({
      firstName: customer_dto.first_name,
      middleName: customer_dto.middle_name,
      lastName: customer_dto.last_name,
    });
    const name = await this.customer_name_repository.save(new_name);
    const profile = await this.customer_profile_repository.save(
      this.customer_profile_repository.create({
        loyality_points: 0,
      }),
    );

    const credentials = await this.credential_repository.save(
      this.credential_repository.create({
        password: hashed_password,
        username: customer_dto.username,
        profile_photo: file?.path || './media/default_profile_photo.png',
      }),
    );
    const customer = this.customer_repository.create({
      email: customer_dto.email,
      phone: customer_dto.phone_number,
      name: name,
      address: address,
      profile: profile,
      credentials: credentials,
    });

    const new_customer = await this.customer_repository.save(customer);
    const otp_resp = await this.otp_service.send_otp(new_customer.email);
    if (otp_resp.status === 'success') {
      const new_otp = this.customer_otp_repository.create({
        customer_id: new_customer,
        otp_key: otp_resp.otp,
      });
      const otp_entry = await this.customer_otp_repository.save(new_otp);

      return {
        status: 'success',
        message: 'Customer registered successfully,Plaease verify your email',
        otp_signature: otp_entry.otp_signature,
      };
    } else {
      return {
        status: 'error',
        message: 'Failed to send OTP',
      };
    }
  }

  async verify_customer(otp_signature: string, otp: number) {
    const resp = await this.otp_service.verify_otp(otp_signature, otp);
    return resp;
  }
  async get_customer_by_id(id: number) {
    const customer = await this.customer_repository.findOne({
      where: { customer_id: id },
      relations: ['name', 'address', 'profile', 'credentials'],
    });
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    } else {
      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        message: 'Customer found',
        data: customer,
      };
    }
  }
  async login_customer(email: string, password: string) {
    const resp = await this.customer_repository.findOne({
      where: { email: email },
      relations: ['credentials', 'name', 'address', 'profile'],
    });
    if (!resp) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    if (
      await this.auth_service.compare_password(
        password,
        resp.credentials.password,
      )
    ) {
      const body = this.otp_service.welcome_body;
      this.mailService.send_email_with_html(
        resp.email,
        'Welcome to ArkPlayZone',
        body,
      );
      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        message: 'Login successful',
        data: resp,
      };
    } else {
      throw new HttpException('Invalid Password', HttpStatus.UNAUTHORIZED);
    }
  }
  async customer_forget_password(email: string) {
    const customer = await this.customer_repository.findOne({
      where: { email: email },
      relations: ['credentials'],
    });
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    const otp_resp = await this.otp_service.send_otp(email);
    if (otp_resp.status === 'success') {
      const new_otp = this.customer_otp_repository.create({
        customer_id: customer,
        otp_key: otp_resp.otp,
      });
      const otp_entry = await this.customer_otp_repository.save(new_otp);
      return {
        status: 'success',
        statusCode: HttpStatus.OK,
        message: 'OTP sent successfully',
        otp_signature: otp_entry.otp_signature,
      };
    } else {
      throw new HttpException('Failed to send OTP',HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
  async reset_password(
    otp_signature: string,
    otp: number,
    new_password: string,
  ) {
    const customer = await this.customer_otp_repository.findOne({
      where: { otp_signature },
      relations: ['customer_id', 'customer_id.credentials'],
    });
    if (!customer) {
      throw new HttpException('Invalid OTP', HttpStatus.BAD_REQUEST);
    }
    const resp = await this.otp_service.verify_otp(otp_signature, otp);
    if (resp.status === 'failed') {
      return resp;
    }
    if (!customer.customer_id.credentials) {
      throw new HttpException(
        'Customer credentials not found',
        HttpStatus.NOT_FOUND,
      );
    }
    //console.log('new password : ' + new_password)
    const hashed_password = await this.auth_service.hash_password(new_password);
    await this.credential_repository.update(
      { credid: customer.customer_id.credentials.credid },
      { password: hashed_password },
    );
    this.mailService.send_email_with_html(
      customer.customer_id.email,
      'Password Has Been Changed',
      this.mailService.reset_password_body,
    );

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: 'Password reset successfully',
    };
  }
  async delete_customer(id: number) {
    const customer = await this.customer_repository.findOne({
      where: { customer_id: id },
    });
    if (!customer) {
      return {
        status: 'failed',
        message: 'Customer not found',
      };
    }
    await this.customer_repository.remove(customer);
    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: 'Customer deleted successfully',
    };
  }
  async update_customer(
    id: number,
    customer_dto: customer_dto,
    file?: Express.Multer.File,
  ) {
    const customer = await this.customer_repository.findOne({
      where: { customer_id: id },
      relations: [
        'name',
        'address',
        'profile',
        'credentials',
        'address.street',
      ],
    });
    if (!customer) {
      throw new HttpException('Customer not found', HttpStatus.NOT_FOUND);
    }
    customer.email = customer_dto.email ?? customer.email;
    customer.phone = customer_dto.phone_number ?? customer.phone;

    customer.name.firstName =
      customer_dto.first_name ?? customer.name.firstName;
    customer.name.middleName =
      customer_dto.middle_name ?? customer.name.middleName;
    customer.name.lastName = customer_dto.last_name ?? customer.name.lastName;

    customer.address.city = customer_dto.city ?? customer.address.city;
    customer.address.postal_code =
      customer_dto.postal_code ?? customer.address.postal_code;

    customer.address.street.street_name =
      customer_dto.street_name ?? customer.address.street.street_name;
    customer.address.street.street_no =
      customer_dto.street_no ?? customer.address.street.street_no;
    customer.address.street.apartment_name =
      customer_dto.apartment_name ?? customer.address.street.apartment_name;

    customer.credentials.password =
      (await this.auth_service.hash_password(customer_dto.password)) ??
      customer.credentials.password;
    customer.credentials.username =
      customer_dto.username ?? customer.credentials.username;
    customer.credentials.profile_photo =
      file?.path ?? customer.credentials.profile_photo;

    await this.street_repository.save(customer.address.street);
    await this.address_repository.save(customer.address);
    await this.customer_name_repository.save(customer.name);
    await this.credential_repository.save(customer.credentials);
    await this.customer_repository.save(customer);

    return {
      status: 'success',
      statusCode: HttpStatus.OK,
      message: 'Customer updated successfully',
      data: customer,
    };
  }
}
