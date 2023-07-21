import { database } from "@/database/databaseClient";
import { comment } from "@/lib/CommentSchema/schema";
import { authOptions } from "@/lib/nextAuth/options";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

type Params = {
  params: {
    id: string;
  };
};

export async function DELETE(req: Request, { params }: Params) {
  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ status: 401, ok: false });
  }

  const id = +params.id;

  try {
    const reply = await database.query.comment.findFirst({
      where: (comment, { eq }) =>
        eq(comment.id, id) && eq(comment.userName, session.user?.name!),
    });

    if (!reply) {
      return NextResponse.json({ status: 401, ok: false });
    }

    await database.delete(comment).where(eq(comment.id, id));
    return NextResponse.json({ status: 200, ok: true });
  } catch (e) {
    console.log(e);
    return NextResponse.json({ status: 500, ok: false });
  }
}
