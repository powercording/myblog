import { PutObjectCommand } from '@aws-sdk/client-s3';
import { s3Client } from './s3Client';
import { ChangeEvent } from 'react';

type ImageHandler = (
  image: ChangeEvent<HTMLInputElement>,
  destination?: string,
) => Promise<string | undefined>;

export const imageUploader: ImageHandler = async (image, destination = '') => {
  const file = image.target.files;
  const fileData = file![0];

  if (!fileData || fileData.name === undefined) {
    return;
  }

  console.log(fileData instanceof File);

  const s3BucketImageKey = String(Date.now());
  const filPath = destination === '' ? `${s3BucketImageKey}` : `${destination}/${s3BucketImageKey}`;

  const imageUploadRequest = new PutObjectCommand({
    Bucket: `${process.env.NEXT_PUBLIC_S3_BUCKET ?? 'my--blog'}`,
    Key: filPath,
    Body: fileData,
    ContentType: 'image/jpeg',
  });

  const result = await s3Client.send(imageUploadRequest);

  if (result.$metadata.httpStatusCode !== 200) {
    alert('이미지 업로드에 실패했습니다. 다시 시도해주세요');
  }

  return filPath;
};
