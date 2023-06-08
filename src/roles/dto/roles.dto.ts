import { IsEmpty, IsNotEmpty, IsString } from 'class-validator';

export class RolesDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsEmpty()
  permissions: string[];
}
