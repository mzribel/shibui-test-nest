import { Public, Roles } from "@/common/decorators/roles.decorator";
import { Controller, Get } from "@nestjs/common";
import { Role } from "@prisma/client";

@Controller("test")
export class TestController {
    @Get("public")
    @Public()
    publicRoute() {
        return "Success from public route !"
    }

    @Get("auth")
    authRoute() {
        return "Success from auth route !"
    }

    @Roles(Role.ENTREPRISE)
    @Get("role/company")
        studentRoleRoute() {
        return "Success from companyRole route !"
    }
}