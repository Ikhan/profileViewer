import { Body, Controller, Post } from '@nestjs/common';
import { PermissionDTO } from './dto/permission.dto';
import { PermissionsService } from './permissions.service';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionService: PermissionsService) {}

  @Post('create')
  async register(@Body() permissionDTO: PermissionDTO) {
    return this.permissionService.create(permissionDTO);
  }
}
