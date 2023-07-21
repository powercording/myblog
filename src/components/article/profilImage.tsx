import Image from 'next/image';
import { ComponentPropsWithoutRef } from 'react';

type ProfileImage = {
  authorProfilImg: string | null;
} & ComponentPropsWithoutRef<'img'>;

export default function ProfilImage({ authorProfilImg, ...rest }: ProfileImage) {
  const profileImg = authorProfilImg ?? '/defaultProfile/1';
  const { className } = rest;
  return (
    <Image
      src={profileImg}
      className={className}
      alt="User profile image"
      width={256}
      height={256}
    />
  );
}
