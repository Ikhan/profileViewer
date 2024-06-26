import { Body, Controller, Post, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDTO } from './dto/register.dto';
import { SignInDTO } from './dto/signIn.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() registerDto: RegisterDTO) {
    return this.authService.register(registerDto);
  }

  @Post('signin')
  async signin(@Body() signInDto: SignInDTO) {
    const tokens = await this.authService.signin(signInDto);

    return {
      message: 'User signed in successssfully',
      ...tokens,
    };
  }

  @Post('logout')
  async logout(@Req() request): Promise<any> {
    await this.authService.logout(request.body.refreshToken);

    return {
      message: 'User logged out successssfully',
    };
  }
}
