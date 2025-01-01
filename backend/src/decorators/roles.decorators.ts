import { SetMetadata } from '@nestjs/common';

export const SkipAuth = 'isPublic';
export const Public = () => SetMetadata(SkipAuth, true);
