import { Injectable } from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from '@/prisma.services';
import * as B2 from 'backblaze-b2';

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

  async b2_upload(files: Express.Multer.File[]) {
    try {
      const b2DownloadUrl = [];
      const b2 = new B2({
        applicationKeyId: process.env.B2_APPLICATION_KEY_ID,
        applicationKey: process.env.B2_APPLICATION_KEY,
      });
      const auth_response = await b2.authorize();
      const { downloadUrl } = await auth_response.data;
      const bucket = await b2.getUploadUrl({
        bucketId: process.env.B2_BUCKET_ID,
      });
      const { uploadUrl, authorizationToken } = await bucket.data;

      if (!authorizationToken) {
        throw new Error('Authorization token is undefined');
      }
      for (const file of files) {
        const upload_response = await b2.uploadFile({
          uploadUrl,
          uploadAuthToken: authorizationToken,
          fileName: `${uuid()}-${file.originalname}`,
          data: file.buffer,
          onUploadProgress: (event: any) => {
            console.warn(
              `Progress: ${((event.loaded / event.total) * 100).toFixed(2)}%`,
            );
          },
        });
        b2DownloadUrl.push(
          `${downloadUrl}/file/${process.env.B2_BUCKET_NAME}/${upload_response.data.fileName}`,
        );
      }
      return b2DownloadUrl;
    } catch (error) {
      console.error(error);
    }
  }
}
