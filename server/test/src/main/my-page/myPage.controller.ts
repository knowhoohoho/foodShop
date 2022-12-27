import { Controller, Get, UseGuards } from '@nestjs/common';
import { MyPageService } from './myPage.service';
import { GuardJwt } from 'src/guard/guard'
import { CurrentUser } from 'src/main/user/user.decorator';

@Controller('mypage')
export class MyPageController {
  constructor(private mypageservice : MyPageService) {}

@Get('/')
 async DayList(@CurrentUser() email : string ) {
    return await this.mypageservice.DayList(email)
 }

}
