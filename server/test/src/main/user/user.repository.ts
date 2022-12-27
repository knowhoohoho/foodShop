import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/user.dto";
import * as bcrypt from 'bcrypt'
import { UnauthorizedException } from "@nestjs/common";
import { User } from "../../entity/user.entity";



@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser( nickname, email ) : Promise <any>{
    const user = await this.findOne({email})
    if(!user) {
      const result = await this.save({
        email : email,
        name : nickname
    })
    return  result ? true : false
    }
  return  user.id
  
  }
}