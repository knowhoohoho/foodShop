import { IsEmail, IsInt, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Entity } from "typeorm";



@Entity()
export class CreateUserDto{
  @IsInt()
  name : string;

  @IsString()
  email : string 
}



export class CreateTrainerDto { 
  @IsString()
  token : string

  @IsString()
  email : string
}

export class UserKakaoDto {
  @IsString()
  @IsNotEmpty()
  name :string;

  @IsOptional()
  @IsEmail()
  email : string;



  @IsString()
  @IsNotEmpty()
  accessToken : string;
}