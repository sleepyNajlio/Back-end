import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ 
    UsersModule, 
    PrismaModule,
    ConfigModule.forRoot({isGlobal: true}),
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
