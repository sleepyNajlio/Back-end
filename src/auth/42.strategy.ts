// src/auth/fortytwo.strategy.ts

import { Injectable, HttpException, HttpStatus, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { default as Strategy } from 'passport-42';
import { ConfigService } from '@nestjs/config';
import { Profile } from 'passport';
import { AuthService } from './auth.service';


@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
  constructor(private readonly configService: ConfigService, 
    private readonly authService: AuthService) {
    super({
      clientID: configService.get<string>('FORTYTWO_APP_ID'),
      clientSecret: configService.get<string>('FORTYTWO_APP_SECRET'),
      callbackURL: configService.get<string>("CALL_BACK_URL"),
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: Profile): Promise<any> {
    // Add your logic to validate or create a user based on the profile data
    const user = await this.authService.validateUser(profile.emails[0].value);
    if (!user) {
      throw new UnauthorizedException;
    }
    console.log(user);
    return { userId: profile.id, username: profile.username };
  }
}
