import { IsNotEmpty, IsString } from 'class-validator';
import { UserRoles } from 'src/roles/userRoles';

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
  password: string;

  @IsNotEmpty()
  roles: UserRoles;
}
