import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { AdsTypeService } from './ads-type.service';
import { CreateAdsTypeDto } from './dto/create-ads-type.dto';
import { UpdateAdsTypeDto } from './dto/update-ads-type.dto';

@Controller('ads-type')
export class AdsTypeController {
  constructor(private readonly adsTypeService: AdsTypeService) {}

  @Post()
  async create(@Body() createAdsTypeDto: CreateAdsTypeDto) {
    try {
      return this.adsTypeService.create(createAdsTypeDto);
    } catch (error) {
      throw error;
    }
  }

  @Get()
  findAll() {
    try {
      return this.adsTypeService.findAll();
    } catch (error) {
      throw error;
    }
  }

  @Get('name/:name')
  async GetByName(@Param('name') name: CreateAdsTypeDto['type_name']) {
    try {
      return await this.adsTypeService.findByName(name);
    } catch (error) {
      throw error;
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.adsTypeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateAdsTypeDto: UpdateAdsTypeDto) {
    return this.adsTypeService.update(id, updateAdsTypeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.adsTypeService.remove(+id);
  }
}
