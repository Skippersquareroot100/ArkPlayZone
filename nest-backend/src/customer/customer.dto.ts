import { Type } from "class-transformer";
import { IsDateString, IsEmail, IsIn, IsInt, isNotEmpty, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, Matches, minLength, MinLength } from "class-validator";

export class create_customer_dto{
    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, {
    message: 'First name must contain only alphabets',
  })
    first_name : string ;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, {
    message: 'Last name must contain only alphabets',})
    last_name : string ;
    
    @IsNotEmpty()
    @IsEmail({},{
        message:'Email Must be and Valid Email',
    })
    email :  string ;

    @IsNotEmpty()
    @IsIn(['male','female'],{
    message: 'Gender must be either "male" or "female"',
    })
    gender:string;

    @IsNotEmpty()
    @IsNumberString({}, {
    message: 'Phone number must contain only numbers',
    })
    @Length(14,14,{
        message : "Phone number must be 14 digits ",
    })
    phone_number: string;

    @IsNotEmpty()
    @MinLength(6,{
        message : "Password must be at least 6 characters long"
    })
    @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
    })
    @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
    })
    @Matches(/(?=.*\d)/, {
    message: 'Password must contain at least one number',
    })
    @Matches(/(?=.*[!@#$%^&*()_\-+=\[\]{};':"\\|,.<>\/?])/, {
    message: 'Password must contain at least one special character',
    })
    password: string;

    @IsNotEmpty()
    @IsDateString({}, { message: 'Invalid Date Formate !! Date of birth must be in YYYY-MM-DD format' })
    date_of_birth : Date ;

}


export class address_dto{
    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, {
    message: 'City must contain only alphabets',})
    city : string

    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, {
    message: 'Country must contain only alphabets',})
    country : string

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    postal_code :  number ;

    @IsNotEmpty()
    @Type(() => Number)
    @IsNumber()
    street_no : number ;

    @IsOptional()
    @IsString()
    street_name : string ; // defult value 'Unknown'



}