import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from '@modules/auth/auth.service';

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("register/student")
  registerEtudiant(@Body() dto: { email: string; password: string }) {
    return this.authService.registerEtudiant(dto.email, dto.password);
  }
  @Post("register/company")
  registerEntreprise(@Body() dto: { email: string; password: string }) {
    return this.authService.registerEntreprise(dto.email, dto.password);
  }

  @Post("login")
  login(@Body() dto: {email:string;password:string}) {
    return this.authService.login(dto.email, dto.password)
  }
}
