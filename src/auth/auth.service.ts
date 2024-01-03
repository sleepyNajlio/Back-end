import { Injectable, UnauthorizedException, ForbiddenException, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignUpDTO } from 'src/users/dto/SignUp.dto';
import { MailDTO } from 'src/users/dto/Mail.dto';
import { ConfigService } from '@nestjs/config';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService,
        private jwtService: JwtService,
        private config: ConfigService) {}

    async validateUser(profile: SignUpDTO ): Promise<any> {
        let user = await this.usersService.findByUsername(profile.username);
        if (!user) {
            await this.usersService.signUp({
                username: profile.username,
                email: profile.email,
                avatar: profile.avatar,
              });;
            user = await this.usersService.findByUsername(profile.username);
        }
        return user;
    }

    async signToken(user: MailDTO) {
        
        const payload = {  email: user.email };
        const access_token = this.jwtService.sign(payload);
        return access_token;
    }

    async finish_signup(dto: SignUpDTO, UserToken: string) {
      console.log("finish_signup service");
      if (!UserToken) throw new UnauthorizedException('Invalid Request');
      try {
        await this.jwtService.verifyAsync(UserToken, {
          secret: this.config.get('JWT_SECRET'),
        });
      } catch {
        throw new UnauthorizedException();
      }
      const user = await this.usersService.finishSignUp({
          email: dto.email,
          username: dto.username,
          avatar: dto.avatar,
        });
      return this.signToken({ email: user.email});
        // let player = await this.usersService.findByEmail(dto.email);
        // if (!player)
        //   throw new ForbiddenException('you need to signup with intra first');
        // if (player.isAuthenticated)
        //   throw new ForbiddenException('User Already Authenticated ');
        // await this.usersService.updateProfile({
        //     email: dto.email,
        //     username: dto.username,
        //     avatar: dto.avatar,
        //     isAuth: true,
        // });
        // await this.prisma.player.updateMany({
        //   where: {
        //     email: dto.email,
        //   },
        //   data: {
        //     username: dto.username,
        //     isAuthenticated: true,
        //   },
        // });
      }



}
