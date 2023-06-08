import { Body, Controller, Param, Post, Put } from '@nestjs/common';
import { RolesDTO } from './dto/roles.dto';
import { RolesService } from './roles.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post('create')
  async create(@Body() roleDTO: RolesDTO) {
    // console.log(resource);
    return await this.rolesService.create(roleDTO);
  }

  @Put(':id/permissions/:permissionId')
  async addPermissionToRole(@Param('id') id: string, @Param('permissionId') permissionId: string) {
    return this.rolesService.addPermissionToRole(id, permissionId);
  }
}
