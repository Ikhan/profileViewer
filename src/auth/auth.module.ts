import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AccessControlModule } from 'nest-access-control';
import { roles } from 'src/roles/userRoles';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Auth, AuthSchema } from './schema/auth.schema';
import { RefreshToken, RefreshTokenSchema } from './schema/refreshToken.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    JwtModule.register({
      secret: 'thisIsMySecret',
      signOptions: { expiresIn: '10m' },
    }),
    AccessControlModule.forRoles(roles),
  ],

  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
