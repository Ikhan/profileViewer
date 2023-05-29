import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { Auth } from './auth.schema';

export type RefreshTokenDocument = RefreshToken & Document;

@Schema()
export class RefreshToken {
  @Prop({ type: String, required: true })
  refreshToken: string;

  @Prop({ type: Types.ObjectId, ref: 'Auth', required: true })
  user: Auth;

  @Prop({ type: Date, default: Date.now, index: { expires: '7d' } }) // the refresh token expires after 7 days
  createdAt: Date;
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken);
