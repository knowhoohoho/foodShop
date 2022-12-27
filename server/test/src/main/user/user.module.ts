import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService, KakaoLogin } from './user.service';
import { HttpModule } from '@nestjs/axios';
import { UserRepository } from './user.repository';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports : [HttpModule,
  TypeOrmModule.forFeature([UserRepository])],
  controllers: [UserController],
  providers: [UserService,KakaoLogin]
})
export class UserModule {}
