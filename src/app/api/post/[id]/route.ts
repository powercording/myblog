import { authOptions } from '@/lib/nextAuth/options';
import { getServerSession } from 'next-auth';
import { vaild } from '../route';
import { database } from '@/database/databaseClient';
import { post } from '@/lib/PostSchema/schema';
import { eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(req: Request, { params }: Params) {
  const markdownId = +params.id;
  const session = await getServerSession(authOptions);

  const markdown = await database
    .select({ userName: post.userName })
    .from(post)
    .where(eq(post.id, markdownId));

  const { userName } = markdown[0];

  const validRequest = vaild({ userName, session });
  if (!validRequest.ok) {
    return validRequest;
  }

  await database.delete(post).where(eq(post.id, markdownId));

  return NextResponse.json({ ok: true });
}
