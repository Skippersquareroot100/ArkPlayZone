import { IsString, IsOptional, IsNotEmpty } from 'class-validator';
/* eslint-disable @typescript-eslint/no-unsafe-call */
export class NameDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;
  @IsOptional()
  @IsString()
  middleName?: string;
  @IsNotEmpty()
  @IsString()
  lastName: string;
}
