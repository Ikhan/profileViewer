import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

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
}

export const AuthSchema = SchemaFactory.createForClass(Auth);
