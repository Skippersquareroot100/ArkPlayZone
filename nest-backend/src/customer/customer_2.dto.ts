import {IsIn, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { NumericType } from "typeorm";

export class customer_db_dto{
    @IsOptional()
    @IsString({message : 'Country Must be a String '})
    @MaxLength(30,{message : 'Country Must a 30 character'})
    country?: string ;

}