import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';
import { Public } from '@/common/decorators/roles.decorator';

@Public()
@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() dto: {email:string;password:string}) {
    return this.authService.login(dto.email, dto.password)
  }
}
