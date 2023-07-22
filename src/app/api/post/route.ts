import { database } from '@/database/databaseClient';
import { post } from '@/lib/PostSchema/schema';
import { authOptions } from '@/lib/nextAuth/options';
import { eq } from 'drizzle-orm';
import { Session, getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';

type ValidParams = {
  userName: string;
  session?: Session | null;
};
type Valid = ({ userName, session }: ValidParams) => NextResponse;

const host = process.env.NEXT_PUBLIC_URL;

export const vaild: Valid = ({ userName, session }) => {
  if (!session) {
    console.log('no session');
    return NextResponse.json({
      ok: false,
      status: 403,
      error: { message: 'User not found. Please sign in first.' },
    });
  }

  if (userName && session.user?.email !== userName) {
    console.log('user match failed');
    return NextResponse.json({
      ok: false,
      status: 401,
      error: { message: 'Un authorized.' },
    });
  }

  return NextResponse.json({ ok: true });
};

export async function PATCH(req: Request) {
  const session = await getServerSession(authOptions);
  const { content, title, id, userName, categories } = await req.json();

  const validRequest = vaild({ userName, session });
  if (!validRequest.ok) {
    return validRequest;
  }

  await database.update(post).set({ content, title, categories }).where(eq(post.id, id));

  return NextResponse.redirect(`${host}/post/${id}`);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  // 위 세션이 null 임
  const { content, title, categories } = await req.json();

  if (!session) {
    return NextResponse.json({ ok: false, status: 404 });
  }

  const result = await database
    .insert(post)
    .values({ content, title, userName: session.user?.email!, categories });

  return NextResponse.redirect(`${host}/post/${result.insertId}`);
}
