import { Controller, Post, Get, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('42')
  @UseGuards(AuthGuard('42'))
  FTAUth() {
    return "Authentification 42";
  }

  @Get('42/callback')
  @UseGuards(AuthGuard('42'))
  async FTRedirect() {
    return "Redirect 42";
  }





}
