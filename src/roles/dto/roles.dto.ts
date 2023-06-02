import { IsArray, IsNotEmpty, IsString } from 'class-validator';

export class RolesDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsArray()
  permissions: string[];
}
