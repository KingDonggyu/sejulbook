import { PresignedPost } from '@aws-sdk/s3-presigned-post';
import HttpClient from '@/lib/HttpClient';
import { BadRequestException } from '@/server/exceptions';

class ImageRepository extends HttpClient {
  private baseUrl = 'image';

  async upload(blob: Blob) {
    try {
      const { type } = blob;

      const { url, fields } = await this.getRequest<PresignedPost>(
        `${this.baseUrl}/upload`,
        { params: { type } },
      );

      const formData = new FormData();

      Object.entries(fields).forEach(([key, value]) => {
        formData.append(key, value);
      });

      formData.append('file', new File([blob], blob.name));

      await this.postRequset(url, formData);
      return `${url}${fields.key}`;
    } catch {
      throw new BadRequestException('지원하지 않는 파일 형식입니다.');
    }
  }

  async delete(imageKeys: string[]) {
    await fetch(`/api/${this.baseUrl}/delete`, {
      method: 'POST',
      body: JSON.stringify({ imageKeys }),
    });
  }
}

export default ImageRepository;
