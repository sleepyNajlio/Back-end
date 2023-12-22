import { Body, Controller, Post, Get, Req} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signin.dto';
import { Request } from 'express';
import { Public } from './public.decorator';


@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  
  @Post('signin')
  @Public()
  signIn(@Req() req: Request, @Body() signInDto: SignInDto) {
    console.log(req);
    // console.log(signInDto);
    return this.authService.signIn(signInDto);
  }

  @Get("test")
  test(@Req() req: Request) {
    console.log(req.headers);
    return "test";
  }

}
