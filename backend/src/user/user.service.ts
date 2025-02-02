import { PrismaService } from '@/prisma.services';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return data;
  }

  async getByGooleId(googleId: string) {
    return await this.prisma.user.findFirst({
      where: {
        google_id: googleId,
      },
    });
  }

  async getMe(req: Request) {
    console.log(req);
    return 'hola';
  }
}
