import { database } from '@/database/databaseClient';
import { comment } from '@/lib/CommentSchema/schema';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'edge';

export async function POST(req: NextRequest) {
  const { postId, userName, content } = await req.json();

  try {
    await database.insert(comment).values({ userName, content, postId });
  } catch (e) {
    return NextResponse.json({ status: 500, ok: false });
  }

  return NextResponse.json({ status: 200, ok: true });
}

export async function DELETE(req: NextRequest) {}
