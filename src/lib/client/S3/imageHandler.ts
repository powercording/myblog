import { PutObjectCommand } from "@aws-sdk/client-s3";
import { s3Client } from "./s3Client";
import { ChangeEvent, Dispatch, SetStateAction } from "react";

type ImageHandler = (
  e: ChangeEvent<HTMLInputElement>,
  setMarkdown: Dispatch<SetStateAction<string>>
) => void;

export const imageHandler: ImageHandler = async (e, setMarkdown) => {
  const file = e.target.files;
  const s3BucketImageKey = String(Date.now());

  if (!file) {
    return;
  }

  const imageUploadRequest = new PutObjectCommand({
    Bucket: `${process.env.NEXT_PUBLIC_S3_BUCKET}`,
    Key: s3BucketImageKey,
    Body: file[0],
    ContentType: "image/jpeg",
  });

  const result = await s3Client.send(imageUploadRequest);

  if (result.$metadata.httpStatusCode !== 200) {
    alert("이미지 업로드에 실패했습니다. 다시 시도해주세요");
  }

  const textArea = e.target.previousElementSibling
    ?.previousElementSibling as HTMLTextAreaElement;
  const cursorPosition = textArea.selectionStart;
  const insertedImage = `
  <img src="${process.env.NEXT_PUBLIC_S3_ENDPOINT}/${s3BucketImageKey}">
  `;

  setMarkdown(
    (prev) =>
      prev.slice(0, cursorPosition) +
      insertedImage +
      prev.slice(cursorPosition + 1)
  );
};
