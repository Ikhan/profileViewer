import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type permissionDocument = HydratedDocument<Permission>;

@Schema()
export class Permission {
  @Prop({ required: true })
  resource: string;

  @Prop()
  action: string;

  @Prop()
  possession: string;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
