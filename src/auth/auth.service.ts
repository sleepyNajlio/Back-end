import { Injectable, UnauthorizedException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { SignInDto } from './dto/signin.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService, 
        private jwtService: JwtService) {}

    async signIn(signInDto: SignInDto): Promise<any> {
        // console.log(signInDto);
        const user = await this.usersService.findMail(signInDto.email);
        if (!user) {
            throw new UnauthorizedException();
        }
        const payload = { sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
            };
    }

    async validateUser(email: string, pass: string): Promise<SignInDto | null> {
        // const result  = user;
        // // TODO: Generate a JWT and return it here
        // // instead of the user object
        // return result;
        console.log(email);
        return null;
    }
}
