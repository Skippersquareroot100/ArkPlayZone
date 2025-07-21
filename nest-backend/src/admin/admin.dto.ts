import { IsString,IsNotEmpty } from "class-validator";

export class AdminData {
    @IsString()
    name: string;
    email: string;
}
