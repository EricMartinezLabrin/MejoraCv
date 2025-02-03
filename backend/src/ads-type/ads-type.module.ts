import { Module } from '@nestjs/common';
import { AdsTypeService } from './ads-type.service';
import { AdsTypeController } from './ads-type.controller';
import { PrismaService } from '@/prisma.services';

@Module({
  controllers: [AdsTypeController],
  providers: [AdsTypeService, PrismaService],
  exports: [AdsTypeService],
})
export class AdsTypeModule {}
