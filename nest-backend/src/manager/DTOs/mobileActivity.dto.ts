import { IsNotEmpty, IsOptional } from 'class-validator';

export class MobileActivityDto {
  @IsNotEmpty()
  name: string;
  @IsOptional()
  description: string;
}
