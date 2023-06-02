import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type roleDocument = HydratedDocument<Role>;

@Schema()
export class Role {
  @Prop({ required: true })
  name: Role;

  @Prop([String])
  permissions: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
