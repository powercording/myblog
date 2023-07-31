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
    <main className="flex min-h-screen flex-col items-center justify-between py-9 px-3 md:p-12  mx-auto">
      <div className="py-12 min-h-screen h-auto grid grid-cols-5 w-full xl:w-4/6 mx-auto gap-3">
        <aside className="hidden md:block md:col-span-1">
          <div className="sticky top-12 p-3">
            <FilteredCategory current={searchParams.category} />
          </div>
        </aside>
        <article className="col-span-5 md:col-span-3 flex flex-col gap-3">
          {posts.length ? (
            posts.map(post => {
              return (
                <Link href={`/post/${post.id}`} key={post.id}>
                  <Article article={post} key={post.id} />
                </Link>
              );
            })
          ) : (
            <Link className="self-center text-yellow-300 p-5" href="/">
              이 카테고리의 포스트는 아직 작성되지 않았어요.
              <br />
              터치하면 메인으로 돌아갑니다.
            </Link>
          )}
        </article>
        <aside className="hidden md:block md:col-span-1">
          <div className="sticky top-12 p-3"></div>
        </aside>
        <div className="md:hidden"></div>
      </div>
    </main>
  );
}
