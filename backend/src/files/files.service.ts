import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from '@/prisma.services';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}
  create(files: Express.Multer.File[], createFileDto: CreateFileDto) {
    console.log(files);
    console.log(createFileDto);
    return 'This action adds a new file';
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  update(id: number, updateFileDto: UpdateFileDto) {
    console.log(updateFileDto);
    return `This action updates a #${id} file`;
  }

  remove(id: number) {
    return `This action removes a #${id} file`;
  }
}
