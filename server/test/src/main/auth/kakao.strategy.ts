import { Controller } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-kakao";




export class kakaoStrategy extends PassportStrategy(Strategy) {
  constructor () {
    super({
      clientID : process.env.KAKAO_REST,
      callbackURL : process.env.KAKAO_CALLBACK
    })
  }
}
