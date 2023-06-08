import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { AuthService } from 'src/auth/auth.service';
import { AtGuard } from 'src/utility/guard/AtGuard';

@Controller('users')
export class UsersController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AtGuard, ACGuard)
  @UseRoles({
    resource: 'profile',
    action: 'read',
    possession: 'any',
  })
  @Get('/:id')
  async getUser(@Param('id') userId: string) {
    const user = await this.authService.findById(userId);
    return {
      message: 'User details',
      user,
    };
  }
}
