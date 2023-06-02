import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from 'src/auth/auth.module';
import { AuthService } from 'src/auth/auth.service';
import { Auth, AuthSchema } from 'src/auth/schema/auth.schema';
import { RefreshToken, RefreshTokenSchema } from 'src/auth/schema/refreshToken.schema';
import { AtStrategy } from 'src/auth/strategy/at.strategy';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Auth.name, schema: AuthSchema }]),
    MongooseModule.forFeature([{ name: RefreshToken.name, schema: RefreshTokenSchema }]),
    AuthModule,
    JwtModule.register({
      secret: 'thisIsMySecret',
      signOptions: { expiresIn: '1m' },
    }),
  ],

  providers: [UsersService, AuthService, AtStrategy],
  controllers: [UsersController],
})
export class UsersModule {}
