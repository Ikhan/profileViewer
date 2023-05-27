import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { Model } from 'mongoose';
import { RegisterDTO } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Auth') private authModel: Model<RegisterDTO>,
    private jwtService: JwtService,
  ) {}

  async register(
    registerDTO: RegisterDTO,
  ): Promise<{ fullname: string; username: string; email: string }> {
    const saltorRound = 10;

    const { fullname, username, email } = registerDTO;

    const hashPassword = await bcrypt.hash(
      registerDTO.hash_password,
      saltorRound,
    );

    const createUser = new this.authModel({
      fullname,
      username,
      email,
      hashPassword,
    });

    return createUser.save();
  }
}
