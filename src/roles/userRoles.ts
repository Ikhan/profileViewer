import { RolesBuilder } from 'nest-access-control';

export enum UserRoles {
  Admin = 'Admin',
  Reader = 'Reader',
}

export const roles: RolesBuilder = new RolesBuilder();
roles
  .grant(UserRoles.Reader)
  .readAny(['profile'])
  .grant(UserRoles.Admin)
  .extend(UserRoles.Reader)
  .updateAny(['profile'])
  .createAny(['profile'])
  .deleteAny(['profile']);
