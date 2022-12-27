import { HttpService } from '@nestjs/axios';
import { 
   Controller,
   Get,
   Post,
   Body,
   Param, 
   Request,
   Query,
   Res,
   Req,
   HttpStatus
 } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';
import { UserService, KakaoLogin } from './user.service'


@Controller('user')
export class UserController {
  constructor(
    private userService : UserService,
    private kakaoService : KakaoLogin
    ) {}
  


@Get('/kakaoLogin')
kakaoLogin (@Res() res ) : void  {
  const baseUrl = 'https://kauth.kakao.com/oauth/authorize'
  const config = {
    client_id : process.env.KAKAO_REST,
    redirect_uri : process.env.KAKAO_CALLBACK,
    response_type : 'code'
  }
  const params = new URLSearchParams(config).toString()
  const URL = `${baseUrl}?${params}`
  return res.redirect(URL)
}

@Get('/kakaoCallback')
async kakaoOauth(@Query() rs) {
  const code = rs.code;
 return  this.kakaoService.kakaoOauth(code);
}

@Get('logout')
async kakaoLogout(@Req() req, @Res() res)  : Promise<void> {
  const token = req.headers['authorization']
  return await this.kakaoService.LogOut(token)
}

@Get('mypage')
async myPage() {
  
}


}