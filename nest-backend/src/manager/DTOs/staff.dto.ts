import { IsNotEmpty, Matches, MinLength } from 'class-validator';

export class StaffDto {
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+$/, {
    message: 'First name is required and must contain only letters',
  })
  firstName: string;
  @Matches(/^[a-zA-Z]+$/, { message: 'Middle name must contain only letters' })
  middleName?: string;
  @IsNotEmpty()
  @Matches(/^[a-zA-Z]+$/, {
    message: 'Last name is required and must contain only letters',
  })
  lastName: string;

  @IsNotEmpty({ message: 'Street number is required' })
  street_no: string;
  @IsNotEmpty({ message: 'Street name is required' })
  street_name: string;
  @IsNotEmpty({ message: 'Apartment name is required' })
  apartment_name: string;

  @IsNotEmpty({ message: 'City is required' })
  city: string;
  @IsNotEmpty({ message: 'State is required' })
  state: string;
  @IsNotEmpty({ message: 'Postal code is required' })
  postal_code: string;

  @IsNotEmpty({ message: 'Deduction is required' })
  deduction: number;

  @IsNotEmpty({ message: 'Overtime is required' })
  overtime: number;

  @IsNotEmpty({ message: 'Role is required' })
  role: string;

  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @Matches(/^01\d{8,9}$/, { message: 'Phone number must start with 01' })
  phone: string;
  @IsNotEmpty({ message: 'Salary is required' })
  salary: number;

  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?=.*[a-z])(?=.*[@#$&]).*$/, {
    message:
      'Password must contain at least one lowercase letter and one special character (@, #, $, &)',
  })
  password: string;
}
