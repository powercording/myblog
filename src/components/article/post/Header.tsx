import { database } from '@/database/databaseClient';
import { post } from '@/lib/PostSchema/schema';
import { dateFormatter } from '@/lib/util/dateTimeFormatter';
import { eq } from 'drizzle-orm';
import Link from 'next/link';
import { FiTool } from 'react-icons/fi';

interface PostHeader {
  postId: number;
  currentUser: string;
}

export default async function PostHeader({ postId, currentUser }: PostHeader) {
  const headerInfo = await database.query.post.findFirst({
    where: eq(post.id, postId),
    columns: { title: true, userName: true, createdAt: true },
  });

  if (!headerInfo) {
    return <div className="mt-12">페이지 조회에 실패하였습니다.</div>;
  }

  const isOwner = currentUser === headerInfo.userName;

  return (
    <header className="mt-12 min-h-fit  bg-slate-800 relative">
      <h1 className="block w-full 2xl:w-3/4 mx-auto p-5 text-2xl font-bold text-blue-500">
        {headerInfo.title}
      </h1>
      <address className="block w-full 2xl:w-3/4 mx-auto p-5 text-gray-400">
        <p>{headerInfo.userName}</p>
        <div className="flex">
          <time>{dateFormatter(headerInfo.createdAt)}</time>
          {isOwner && (
            <Link href={`edit/${postId}`} className="absolute right-5 top-5">
              <button className="p-2 rounded-md hover:bg-blue-100 bg-white text-blue-700 w-fit h-9">
                <FiTool />
              </button>
            </Link>
          )}
        </div>
      </address>
    </header>
  );
}
