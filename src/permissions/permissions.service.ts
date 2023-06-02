import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PermissionDTO } from './dto/permission.dto';
import { Permission } from './schema/permission.schema';

@Injectable()
export class PermissionsService {
  constructor(@InjectModel(Permission.name) private permisssionModel: Model<Permission>) {}

  async create(permissionDTO: PermissionDTO) {
    const { resource, action, possession } = permissionDTO;

    const permission = new this.permisssionModel({
      resource,
      action,
      possession,
    });

    permission.save();
  }
}
