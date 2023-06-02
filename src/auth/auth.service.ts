import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';

import { Model } from 'mongoose';
import { RegisterDTO } from './dto/register.dto';
import { SignInDTO } from './dto/signIn.dto';
import { SignInResponse } from './interface/signInInterface';
import { Auth, authDocument } from './schema/auth.schema';
import { RefreshToken } from './schema/refreshToken.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Auth.name)
    private authModel: Model<RegisterDTO>,
    @InjectModel(RefreshToken.name)
    private refreshTokenModel: Model<RefreshToken>,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDTO: RegisterDTO,
  ): Promise<{ fullname: string; username: string; email: string }> {
    const saltOrRound = 10;

    const { fullname, username, email } = registerDTO;

    const hashPassword = await bcrypt.hash(
      registerDTO.hashPassword,
      saltOrRound,
    );

    const createUser = new this.authModel({
      fullname,
      username,
      email,
      hashPassword,
    });

    return createUser.save();
  }

  async findById(id: string): Promise<authDocument> {
    const getUser = await this.authModel.findById(id);
    return getUser;
  }

  async signin(signInDto: SignInDTO): Promise<SignInResponse> {
    {
      const { email, hashPassword } = signInDto;

      try {
        //validate the user
        const user = await this.validateUser(email, hashPassword);
        //genereteJWT

        const accessToken = await this.generateJWT(user);

        //generateRefreshToken

        const refreshToken = await this.generateRefreshToken(
          user._id.toString(),
          7,
        );

        return {
          message: 'User Signed in successfully',
          user: {
            id: user._id.toString(),
            username: user.username,
            fullname: user.fullname,
            email,
          },
          tokens: {
            accessToken,
            refreshToken,
          },
        };
      } catch (error) {
        if (error.message === 'Invalid email or password') {
          throw error;
        }

        throw new UnauthorizedException('Failed to sign in');
      }
    }
  }

  async validateUser(email: string, password: string): Promise<authDocument> {
    const user = await this.authModel.findOne({ email });

    const passwordCheck =
      user && (await bcrypt.compare(password, user.hashPassword));

    if (!passwordCheck) {
      throw new ForbiddenException('invalid credentials');
    }

    return user;
  }

  async generateJWT(user: authDocument): Promise<string> {
    const payload = {
      id: user._id.toString(),
      username: user.username,
      email: user.email,
    };
    return this.jwtService.sign(payload);
  }

  async generateRefreshToken(
    userId: string,
    expiresIn: number,
  ): Promise<string> {
    const user = await this.authModel.findById(userId);

    if (!user) {
      throw new Error('user not found');
    }

    const newRefreshToken = this.jwtService.sign(
      {
        _id: user._id,
        email: user.email,
      },
      {
        expiresIn: '7d',
      },
    );

    const refreshToken = new this.refreshTokenModel({
      user: user._id,
      refreshToken: newRefreshToken,
      createdAt: Date.now(),
    });

    refreshToken.createdAt.setSeconds(
      refreshToken.createdAt.getSeconds() + expiresIn,
    );

    await refreshToken.save();

    return newRefreshToken;
  }
}
