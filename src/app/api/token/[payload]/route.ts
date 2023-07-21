import { database } from '@/database/databaseClient';
import { token } from '@/lib/TokenSchema/schema';
import { InferModel, eq } from 'drizzle-orm';
import { NextResponse } from 'next/server';

export const runtime = 'edge';

type Params = {
  params: {
    payload: string;
  };
};

type ResponsType = NextResponse<InferModel<typeof token> | undefined>;

export async function GET(req: Request, { params }: Params): Promise<ResponsType> {
  const { payload } = params;

  const existToken = await database.select().from(token).where(eq(token.payload, payload));

  return NextResponse.json(existToken[0]);
}

export type GetTokenReturnType = ReturnType<typeof GET>;
