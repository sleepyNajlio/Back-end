import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Profile } from 'passport';
import  Strategy  from 'passport-42';
import { AuthService } from './auth.service';
import { ConfigService } from '@nestjs/config';

interface profile extends Profile {
    id: string;
    provider: string;
    username: string;
    displayName: string;
    name: {
        familyName: string;
        givenName: string;
    };
    profileUrl: string;
    phoneNumbers: string;

    _raw: string;
    _json: any;
}

@Injectable()
export class FortyTwoStrategy extends PassportStrategy(Strategy, '42') {
    constructor(private authService: AuthService,
        private configService: ConfigService) {
        super({
            clientID: configService.get('FORTYTWO_APP_ID'),
            clientSecret: configService.get('FORTYTWO_APP_SECRET'),
            callbackURL: 'http://localhost:5173/auth/42/redirect',
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: any) {
        const profil = profile;
        console.log(profil);
        // const { id, username } = profile;
        // // You can add a method in AuthService to find or create a user in your database by 42 id and username
        // const user = await this.authService.signIn(id, username);
        // if (!user) {
        //     throw new UnauthorizedException();
        // }
        
        return profile || null;
    }
}