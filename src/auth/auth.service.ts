import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';


@Injectable()
export class AuthService {
    constructor(private usersService: UsersService) {}

    async validateUser(mail: string): Promise<any> {
        const user = await this.usersService.findMail(mail);
        if (!user) {
            // const result = user;
            return user;
        }
        return null;
    }
}
