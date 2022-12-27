import { HttpService } from '@nestjs/axios';
import { NotFoundException, UnauthorizedException} from '@nestjs/common'
import { Injectable, Redirect, Res } from '@nestjs/common';
import { UserRepository } from './user.repository';



@Injectable()
export class UserService {
  constructor(private userRepository : UserRepository) {}







}







@Injectable()
export class KakaoLogin {
  private http : HttpService
  constructor(
   private userrepository : UserRepository
  ) {
    this.http = new HttpService();
  }
  async kakaoOauth(code : string  ) :Promise<any>  {
    const baseUrl = 'https://kauth.kakao.com/oauth/token'
    const config = {
      client_id: process.env.KAKAO_REST,
      grant_type: 'authorization_code',
      redirect_uri: process.env.KAKAO_CALLBACK,
      code: code,
      client_secret : process.env.KAKAO_SECRET,
    }
   const headers = {
        'Content-Type' : 'application/x-www-form-urlencoded;charset=utf-8'
      }
    
    const params = new URLSearchParams(config).toString()
    const Url = `${baseUrl}?${params}`
    const result = await this.http.post(Url, '', {headers}).toPromise()
    const { access_token } = result.data
    const data = await this.kakaoUserData(access_token)
    if(!data) {
      throw new NotFoundException('존재 하지 않는 회원입니다.');
    }

     const { nickname } = data.kakao_account.profile
     const { email } = data.kakao_account
     const user = await this.userrepository.createUser(nickname, email)

     return {
       id : user,
       token :access_token}
  }

  async kakaoUserData(token : string) : Promise<any> {
    const baseUrl = "https://kapi.kakao.com/v2/user/me"
    const result = await this.http.post(baseUrl,'',{
      headers : {
        Authorization : `Bearer ${token}`,
        'Content-Type' : 'application/x-www-form-urlencoded'
      }
    }).toPromise()
    const userData  = result.data
    return userData
  } 










  async LogOut(token : string) : Promise<any> {
    const admin = process.env.KAKAO_ADMIN
    const baseUrl = 'https://kapi.kakao.com/v1/user/logout';
    const header = {
      Authorization: `bearer ${token}`,
    }
     return  await this.http.post(baseUrl,'', {headers :header}).toPromise()
  }


}
 






