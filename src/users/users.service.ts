import { Injectable , HttpException, HttpStatus} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService} from '../prisma/prisma.service';


@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async signUp(createUserDto: CreateUserDto) {
    const userExists = await this.prisma.user.findUnique({
      where: { email: createUserDto.email }
    });
    if (userExists) {
      return new HttpException('User already exists', HttpStatus.CONFLICT) ;
    }
    const user = await this.prisma.user.create({
      data: createUserDto,
    });
    
    return user;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users;
  }

  async findOne(id: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: id },
    });
    return user;
  }

  async findMail(email: string) {
    console.log(email);
    const user = await this.prisma.user.findUnique({
      where: { email: email},
    });
    return user;
  }


  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.update({
      where: { id: id },
      data: updateUserDto,
    });
    return user;
  }

  async remove(id: number) {
    const user = await this.prisma.user.delete({
      where: { id: id },
    });
    return user;
  }
}
