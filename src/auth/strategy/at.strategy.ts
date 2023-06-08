import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth.service';

@Injectable()
export class AtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      // ignoreExpiration: false,
      secretOrKey: 'thisIsMySecret', // this should be moved to some config file or environment variable
    });
  }

  async validate(payload: any) {
    // Here you could add additional validation logic
    // for example, you could check if user exists in your DB
    const user = await this.authService.findById(payload.id);

    if (!payload) {
      throw new UnauthorizedException();
    }

    return { id: user._id, email: user.email, username: user.username, roles: user.roles };
  }
}
