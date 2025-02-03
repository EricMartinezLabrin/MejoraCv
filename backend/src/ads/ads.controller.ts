import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { AdsService } from './ads.service';
import { CreateAdDto } from './dto/create-ad.dto';
import { UpdateAdDto } from './dto/update-ad.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { memoryStorage } from 'multer';

@Controller('ads')
export class AdsController {
  constructor(private readonly adsService: AdsService) {}

  @Post()
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return callback(
            new BadRequestException(
              'Only .jpg, .jpeg, .png, webp and .gif files are allowed!',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async create(
    @UploadedFile() file: Express.Multer.File,
    @Body() createAdDto: CreateAdDto,
  ) {
    try {
      return await this.adsService.create(createAdDto, file);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.adsService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    try {
      return this.adsService.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  @Patch(':id')
  @UseInterceptors(
    FileInterceptor('image', {
      storage: memoryStorage(),
      fileFilter: (req, file, callback) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif|webp)$/)) {
          return callback(
            new BadRequestException(
              'Only .jpg, .jpeg, .png, webp and .gif files are allowed!',
            ),
            false,
          );
        }
        callback(null, true);
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateAdDto: UpdateAdDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    try {
      return await this.adsService.update(id, updateAdDto, file);
    } catch (error) {
      throw error;
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    try {
      return await this.adsService.remove(id);
    } catch (error) {
      throw error;
    }
  }
}
