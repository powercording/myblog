import { database } from '@/database/databaseClient';
import { user } from '@/lib/UserSchema/schema';
import { InferModel, eq, sql } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

type ResponsType = InferModel<typeof user>;
const PROFILE_IMAGE_URL = 'https://my--blog.s3.ap-northeast-2.amazonaws.com/defaultprofile';

export async function POST(req: Request): Promise<NextResponse<ResponsType | undefined>> {
  const { email } = await req.json();
  const existUser = await database.select().from(user).where(eq(user.email, email));

  return NextResponse.json({ ...existUser[0] });
}

export type GetUserReturnType = ReturnType<typeof POST>;

export async function PUT(req: Request) {
  const { email } = await req.json();

  const dafualtImageIndex = Math.round(Math.random() * 10);

  const createdUser = await database.insert(user).values({
    email,
    name: email,
    updatedAt: sql`(CURRENT_TIMESTAMP(3))`,
    avatar: `${PROFILE_IMAGE_URL}/${dafualtImageIndex}.jpg`,
  });

  if (createdUser.rowsAffected !== 0) {
    return NextResponse.json({ status: 200 });
  }

  return NextResponse.json({ status: 500 });
}
