import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CreateFileDto } from './dto/create-file.dto';
// import { UpdateFileDto } from './dto/update-file.dto';
import { PrismaService } from '@/prisma.services';
import * as B2 from 'backblaze-b2';
import { v4 as uuid } from 'uuid';
import { UserService } from '@/user/user.service';

@Injectable()
export class FilesService {
  constructor(
    private prisma: PrismaService,
    private user: UserService,
  ) {}
  async create(
    files: Express.Multer.File[],
    createFileDto: CreateFileDto,
    req: Request,
  ) {
    const res = [];
    const cvUrls = await this.b2_upload(files);
    const user = req['user'].sub;
    for (const cvUrl of cvUrls) {
      const response = await this.prisma.files.create({
        data: {
          fileName: cvUrl.fileName,
          filePath: cvUrl.filePath,
          fileSize: cvUrl.fileSize,
          fileType: cvUrl.fileType,
          fileExtension: cvUrl.fileExtension,
          fileUrl: cvUrl.fileUrl,
          userId: user,
        },
      });
      res.push(response);
    }
    return res;
  }

  findAll() {
    return `This action returns all files`;
  }

  findOne(id: number) {
    return `This action returns a #${id} file`;
  }

  // update(id: number, updateFileDto: UpdateFileDto) {
  //   return `This action updates a #${id} file`;
  // }

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
          fileName: `cvs/${uuid()}-${file.originalname}`,
          data: file.buffer,
          onUploadProgress: (event: any) => {
            console.warn(
              `Progress: ${((event.loaded / event.total) * 100).toFixed(2)}%`,
            );
          },
        });
        b2DownloadUrl.push({
          fileName: upload_response.data.fileName.split('/').pop(),
          filePath: upload_response.data.fileName,
          fileSize: file.size,
          fileType: file.mimetype,
          fileExtension: upload_response.data.fileName.split('.').pop(),
          fileUrl: `${downloadUrl}/file/${process.env.B2_BUCKET_NAME}/${upload_response.data.fileName}`,
        });
      }
      return b2DownloadUrl;
    } catch (error) {
      console.error(error);
      if (error.response) {
        const statusCode = error.response.status;
        const message = error.response.data?.message || error.message;
        throw new HttpException(message, statusCode);
      } else {
        throw new InternalServerErrorException(
          'An error occurred while uploading the file',
        );
      }
    }
  }
}
