import { IsEmail, IsNotEmpty } from "class-validator";

export class GlobalRegisterDto {
    @IsEmail()
    email!: string;

    @IsNotEmpty()
    password!:string;
}