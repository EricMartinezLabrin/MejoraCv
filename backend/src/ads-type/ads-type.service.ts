import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdsTypeDto } from './dto/create-ads-type.dto';
import { UpdateAdsTypeDto } from './dto/update-ads-type.dto';
import { PrismaService } from '@/prisma.services';

@Injectable()
export class AdsTypeService {
  constructor(private prisma: PrismaService) {}

  async create(createAdsTypeDto: CreateAdsTypeDto) {
    try {
      const exist = await this.findByName(createAdsTypeDto.type_name);
      if (exist) {
        throw new ConflictException(
          `Ads type with name ${createAdsTypeDto.type_name} already exists`,
        );
      }
    } catch (error) {
      if (!(error instanceof NotFoundException)) {
        throw error;
      }
      // Si es NotFoundException, continuamos con la creación
    }

    const type = await this.prisma.adsType.create({
      data: createAdsTypeDto,
    });

    return type;
  }

  async findAll() {
    const types = await this.prisma.adsType.findMany();
    return types;
  }

  async findOne(id: string) {
    const type = this.prisma.adsType.findUnique({
      where: { id },
    });

    if (!type) {
      throw new NotFoundException(`Ads type with id ${id} not found`);
    }
    return type;
  }

  async findByName(name: CreateAdsTypeDto['type_name']) {
    const type = await this.prisma.adsType.findUnique({
      where: { type_name: name },
    });

    if (!type) {
      throw new NotFoundException(`Ads type with name ${name} not found`);
    }

    return type;
  }

  async update(id: string, updateAdsTypeDto: UpdateAdsTypeDto) {
    const type = await this.findOne(id);

    if (!type) {
      throw new NotFoundException(`Ads type with id ${id} not found`);
    }

    return await this.prisma.adsType.update({
      where: { id },
      data: updateAdsTypeDto,
    });
    return `This action updates a #${id} adsType`;
  }

  remove(id: number) {
    return `This action removes a #${id} adsType`;
  }
}
