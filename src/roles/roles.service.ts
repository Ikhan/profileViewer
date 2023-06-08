import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Permission, permissionDocument } from 'src/permissions/schema/permission.schema';
import { RolesDTO } from './dto/roles.dto';
import { Role, roleDocument } from './schema/role.schema';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role.name) private roleModel: Model<roleDocument>,
    @InjectModel(Permission.name) private permissionModel: Model<permissionDocument>, // private permissionsService: PermissionsService,
  ) {}

  async create(roleDTO: RolesDTO) {
    const role = new this.roleModel(roleDTO);
    return await role.save();
  }

  async addPermissionToRole(roleId: string, permissionId: string): Promise<Role> {
    const role = await this.roleModel.findById(roleId);

    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    const getPermission = await this.permissionModel.findById(permissionId);

    role.permissions.push(getPermission._id);
    await role.save();
    return role;
  }
}
