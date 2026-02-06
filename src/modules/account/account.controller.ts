import { Body, Controller, Delete, Post, Req } from "@nestjs/common";
import { AccountService } from "./account.service";
import { RegisterCompanyDto } from "./dto/register-company.dto";
import { Public } from "@/common/decorators/roles.decorator";
import { RegisterStudentDto } from "./dto/register-student.dto";
import type { Request } from "express";
import { CurrentUser } from "@/common/decorators/user.decorator";
import { User } from "../user/models/user";


@Controller()
export class AccountController {
    constructor(
        private readonly accountService: AccountService,
    ){}
    
    @Public()
    @Post("auth/register/company")
    registerEntreprise(@Body() dto: RegisterCompanyDto) {
        return this.accountService.registerCompany(dto);
    }

    @Public()
    @Post("auth/register/student")
    registerStudent(@Body() dto: RegisterStudentDto) {
        return this.accountService.registerStudent(dto);
    }

    @Delete("users/me")
    deleteAccount(@CurrentUser() user:User) {
        return "";
    }
}