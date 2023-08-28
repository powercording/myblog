import PostGrid from '@/components/PostGrid';
import Article from '@/components/article/card/article';
import FilteredCategory from '@/components/menu/filteredCategory';
import { database } from '@/database/databaseClient';
import Link from 'next/link';

interface Home {
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function Home({ searchParams }: Home) {
  const getPosts = await database.query.post.findMany({
    with: {
      createdBy: {
        columns: { avatar: true },
      },
    },
  });
  let posts = getPosts.reverse();

  // searchParams 이 존재 할때 포스트 filter
  if (Object.keys(searchParams).length && searchParams !== undefined) {
    posts = posts.filter(post => post.categories === searchParams.category);
  }

  return (
    <PostGrid
      leftMenu={<FilteredCategory current={searchParams.category} />}
      rightMenu={<div>right side</div>}
    >
      {posts.length ? (
        posts.map(post => {
          return (
            <Link href={`/post/${post.id}`} key={post.id}>
              <Article article={post} key={post.id} />
            </Link>
          );
        })
      ) : (
        <Link className="self-center p-5 text-yellow-300" href="/">
          이 카테고리의 포스트는 아직 작성되지 않았어요.
          <br />
          터치하면 메인으로 돌아갑니다.
        </Link>
      )}
    </PostGrid>
  );
}
