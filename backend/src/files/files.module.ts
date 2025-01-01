import { Module } from '@nestjs/common';
import { FilesService } from './files.service';
import { FilesController } from './files.controller';
import { PrismaService } from '@/prisma.services';
import { UserModule } from '@/user/user.module';

@Module({
  controllers: [FilesController],
  providers: [FilesService, PrismaService],
  imports: [UserModule],
})
export class FilesModule {}
