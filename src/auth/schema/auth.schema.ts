import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserRoles } from 'src/roles/userRoles';

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
  password: string;

  @Prop({ type: String, enum: UserRoles, default: UserRoles.Reader })
  roles: UserRoles;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
