import { IsNotEmpty, IsString } from 'class-validator';

export class RegisterDTO {
  @IsNotEmpty()
  @IsString()
  fullname: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  hash_password: string;

  @IsString()
  refreshToken: string;

  @IsString()
  role: string;
}
