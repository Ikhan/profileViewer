import { Controller } from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';

@Controller('roles')
export class RolesController {
  constructor(private readonly authService: AuthService) {}

  // @Post()
  // async create()
}
