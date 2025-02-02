import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { Public } from '@/decorators/roles.decorators';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post()
  async create(@Body() data: CreateUserDto) {
    try {
      return await this.userService.create(data);
    } catch (error) {
      throw error;
    }
  }

  @Get('googleId')
  async getByGooleId(@Query('googleId') googleId: string) {
    try {
      return await this.userService.getByGooleId(googleId);
    } catch (error) {
      throw error;
    }
  }

  @Get('me')
  async getMe(req: Request) {
    try {
      return await this.userService.getMe(req);
    } catch (error) {
      throw error;
    }
  }
}
