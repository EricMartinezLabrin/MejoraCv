import { PartialType } from '@nestjs/mapped-types';
import { CreateAdsTypeDto } from './create-ads-type.dto';

export class UpdateAdsTypeDto extends PartialType(CreateAdsTypeDto) {}
