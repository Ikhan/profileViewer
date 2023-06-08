import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessControlModule } from 'nest-access-control';
import { AuthModule } from 'src/auth/auth.module';
import { PermissionsModule } from 'src/permissions/permissions.module';
import { Permission, PermissionSchema } from 'src/permissions/schema/permission.schema';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';
import { Role, RoleSchema } from './schema/role.schema';
import { roles } from './userRoles';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Role.name, schema: RoleSchema }]),
    MongooseModule.forFeature([{ name: Permission.name, schema: PermissionSchema }]),
    AuthModule,
    PermissionsModule,
    JwtModule.register({
      secret: 'thisIsMySecret',
      signOptions: { expiresIn: '1m' },
    }),
    AccessControlModule.forRoles(roles),
  ],

  providers: [RolesService],
  controllers: [RolesController],
})
export class RolesModule {}
