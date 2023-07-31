import { S3Client } from '@aws-sdk/client-s3';

export const s3Client = new S3Client({
  region: 'ap-northeast-2',
  credentials: {
    accessKeyId: `${process.env.NEXT_PUBLIC_S3_KEY}`,
    secretAccessKey: `${process.env.NEXT_PUBLIC_S3_SECRET_KEY}`,
  },
});
