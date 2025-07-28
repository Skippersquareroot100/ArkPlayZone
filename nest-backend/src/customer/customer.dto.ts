import { IsEmail, IsIn, IsInt, isNotEmpty, IsNotEmpty, IsNumberString, IsString, Length, Matches, minLength, MinLength } from "class-validator";

export class create_customer_dto{
    @IsNotEmpty()
    @IsString()
    @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only alphabets',
  })
    name : string ;
    
    @IsNotEmpty()
    @IsEmail({},{
        message:'Email Must be and Valid Email',
    })
    // aiub.com
    @Matches(/(\.xyz$|\.aiub\.edu$)/, {
    message: 'Email must be a valid email and end with .xyz or aiub.edu',
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
    @Length(17, 17,{
        message : "NID Length Must Be 17 ",
    })
    nid_number : string ;

}