import { HttpException, InternalServerErrorException } from '@nestjs/common';
import * as B2 from 'backblaze-b2';

/**
 * Uploads files to Backblaze B2 cloud storage.
 * .env variables required:
 * B2_APPLICATION_KEY_ID
 * B2_APPLICATION_KEY
 * B2_BUCKET_ID
 * B2_BUCKET_NAME
 *
 *
 * @param {Express.Multer.File[]} files - Array of files to be uploaded.
 * @param {string} filename - The name to be used for the uploaded file.
 * @returns {Promise<Array<{ fileName: string; filePath: string; fileSize: number; fileType: string; fileExtension: string; fileUrl: string }>>}
 *          An array of objects containing details about the uploaded files.
 * @throws {HttpException} If there is an error response from the B2 API.
 * @throws {InternalServerErrorException} If an error occurs during the upload process.
 */

export default async function b2_upload(
  files: Express.Multer.File[],
  filename: string,
) {
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
        fileName: filename,
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
