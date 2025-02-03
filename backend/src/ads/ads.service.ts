import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { PrismaService } from '@/prisma.services';
import b2_upload from '@/utils/b2-upload';
import isValidUrl from '@/utils/check-url';
import { AdsTypeService } from '@/ads-type/ads-type.service';

@Injectable()
export class AdsService {
  constructor(
    private prisma: PrismaService,
    private AdsType: AdsTypeService,
  ) {}

  async create(createAdDto: CreateAdDto, file: Express.Multer.File) {
    /**
     * Creates a new advertisement.
     *
     * @param createAdDto - Data Transfer Object containing the details of the ad to be created.
     * @param file - The image file associated with the ad.
     * @returns The created ad object.
     * @throws {BadRequestException} If the image file is not provided.
     * @throws {BadRequestException} If the title or URL is not provided.
     * @throws {ConflictException} If an ad with the same title or URL already exists.
     * @throws {NotFoundException} If the specified ad type does not exist.
     * @throws {BadRequestException} If the provided URL is invalid.
     */

    if (!file) {
      throw new BadRequestException('Image file is required');
    }
    if (!createAdDto.title || !createAdDto.url) {
      throw new BadRequestException('Title and URL are required');
    }

    const AdExist = await this.prisma.ads.findFirst({
      where: {
        OR: [{ title: createAdDto.title }, { image: createAdDto.url }],
      },
    });

    if (AdExist) {
      throw new ConflictException('Ad already exists');
    }

    const typeExist = await this.AdsType.findOne(createAdDto.type);

    if (!typeExist) {
      throw new NotFoundException('Ad type not found');
    }

    if (isValidUrl(createAdDto.url) === false) {
      throw new BadRequestException('Invalid URL');
    }
    const extension = file.originalname.split('.').pop();
    const title =
      'ads/' + createAdDto.title.replace(/\s/g, '-') + '.' + extension;
    const image = await b2_upload([file], title);
    console.log(image);
    return await this.prisma.ads.create({
      data: { ...createAdDto, image: image[0].fileUrl },
    });
  }

  async findAll() {
    const ads = await this.prisma.ads.findMany();
    return ads;
  }

  async findOne(id: string) {
    const ad = await this.prisma.ads.findUnique({
      where: {
        id: id,
      },
    });

    if (!ad) {
      throw new NotFoundException(`Ad with id ${id} not found`);
    }
    return ad;
  }

  async update(
    id: string,
    updateAdDto: UpdateAdDto,
    file: Express.Multer.File,
  ) {
    const exist = this.findOne(id);

    if (!exist) {
      throw new NotFoundException(`Ad with id ${id} not found`);
    }

    if (file) {
      const extension = file.originalname.split('.').pop();
      const title =
        'ads/' + updateAdDto.title.replace(/\s/g, '-') + '.' + extension;
      const image = await b2_upload([file], title);
      updateAdDto.image = image[0].fileUrl;
    }

    return this.prisma.ads.update({
      where: { id: id },
      data: updateAdDto,
    });
  }

  remove(id: string) {
    return this.prisma.ads.delete({
      where: { id: id },
    });
  }
}
