import { database } from '@/database/databaseClient';
import { token } from '@/lib/TokenSchema/schema';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: Request) {
  const { userId, payload } = await req.json();

  const newToken = await database.insert(token).values({ payload: `${payload}`, userId: +userId });

  return NextResponse.json({ message: 'token created', data: newToken });
}
