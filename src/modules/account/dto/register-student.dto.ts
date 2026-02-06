import { IsString, isString, Matches, MaxLength, MinLength } from "class-validator";
import { GlobalRegisterDto } from "./global-register.dto";

export class RegisterStudentDto extends GlobalRegisterDto{
    @IsString()
    @MinLength(1)
    @MaxLength(50)
    @Matches(/^[\p{L}]+(?:[ '\-][\p{L}]+)*$/u)
    firstName!:string

    @IsString()
    @MinLength(1)
    @MaxLength(50)
    @Matches(/^[\p{L}]+(?:[ '\-][\p{L}]+)*$/u)
    lastName!:string
}