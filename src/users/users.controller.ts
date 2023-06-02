import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import { AtGuard } from 'src/utility/guard/AtGuard';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AtGuard)
  @Get('/:id')
  async getUser(@Param('id') userId: string) {
    return this.authService.findById(userId);
  }
}
