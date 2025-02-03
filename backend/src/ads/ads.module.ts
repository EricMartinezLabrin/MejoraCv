import { Module } from '@nestjs/common';
import { AdsService } from './ads.service';
import { AdsController } from './ads.controller';
import { PrismaService } from '@/prisma.services';
import { AdsTypeModule } from '@/ads-type/ads-type.module';

@Module({
  controllers: [AdsController],
  providers: [AdsService, PrismaService],
  imports: [AdsTypeModule],
})
export class AdsModule {}
