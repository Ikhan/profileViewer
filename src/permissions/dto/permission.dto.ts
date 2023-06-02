import { IsNotEmpty, IsString } from 'class-validator';
import { Possession } from '../enums';

export class PermissionDTO {
  @IsNotEmpty()
  @IsString()
  resource: string;

  @IsNotEmpty()
  @IsString()
  action: string;

  @IsNotEmpty()
  @IsString()
  possession: Possession;
}
