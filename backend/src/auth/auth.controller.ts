import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async loginWithGoogle(@Body() createAuthDto: CreateAuthDto) {
    try {
      return await this.authService.loginWithGoogle(createAuthDto);
    } catch (error) {
      console.error(error);
      return error;
    }
  }
}
