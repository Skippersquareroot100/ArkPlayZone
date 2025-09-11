import { IsNotEmpty, IsString } from 'class-validator';

export class PostNotificationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  message: string;

  @IsNotEmpty()
  @IsString()
  for: string;

}
