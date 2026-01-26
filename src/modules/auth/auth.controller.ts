import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("login")
  login(@Body() dto: {email:string;password:string}) {
    return this.authService.login(dto.email, dto.password)
  }
}
