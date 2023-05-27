import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Role } from '../../role/schema/role.schema';

export type authDocument = HydratedDocument<Auth>;

@Schema()
export class Auth {
  @Prop({ required: true })
  fullname: string;

  @Prop({ required: true })
  username: string;

  @Prop()
  email: string;

  @Prop({ required: true })
  hashPassword: string;

  @Prop(String)
  refreshTokens: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  roles: Role[];
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
