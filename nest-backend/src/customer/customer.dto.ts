import { IsEmail, IsNotEmpty, IsString, Length, Matches, minLength, MinLength } from "class-validator";

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
    @Matches(/\.xyz$/, {
    message: 'Email must be a valid email and end with .xyz',
    })
    email :  string ;

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