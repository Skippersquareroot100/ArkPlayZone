import { Type } from "class-transformer";
import { IsEmail, IsNotEmpty, IsNumber, IsNumberString, IsOptional, IsString, Length, Matches, MinLength } from "class-validator";

export class customer_dto{
    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, {
        message: 'Name must contain only alphabets',
    })
    first_name : string 

    @IsOptional()
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, {
        message: 'Name must contain only alphabets',
    })
    middle_name : string

    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, {
        message: 'Name must contain only alphabets',
    })
    last_name : string
    @IsNotEmpty()
    @IsEmail()
    email : string ;

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
    username : string

    @IsNotEmpty()
    @IsNumberString({}, {
    message: 'Phone number must contain only numbers',
    })
    @Length(11,11,{
        message : "Phone number must be 14 digits ",
    })
    phone_number: string;

    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, {
    message: 'City must contain only alphabets',})
    city : string

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
    street_name : string

    @IsOptional()
    @IsString()
    apartment_name : string
    


}