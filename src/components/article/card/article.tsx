import Category from './category';
import NameAndInfo from './nameAndInfo';
import ProfilImage from '../profilImage';

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userName: string;
  categories: string | null;
  createdBy: { avatar: string | null };
};

const categories = ['category1', 'category2', 'category3', 'category4'];

type ArticleProps = { article: Post };

export default function Article({ article }: ArticleProps) {
  const { userName, title, createdAt, createdBy, categories } = article;

  const { avatar } = createdBy;
  return (
    <div className="group/post flex h-52 w-full cursor-pointer rounded-md bg-gray-50 text-gray-400 hover:bg-slate-100">
      <section
        className="w-[50%] bg-no-repeat p-2"
        style={{
          backgroundImage: `url(/defaultLanguage/${categories}.jpeg)`,
          backgroundSize: 'cover',
        }}
      >
        <div className="h-full w-full text-lg font-extrabold text-blue-400 group-hover/post:drop-shadow-lg md:text-2xl">
          <p className="line-clamp-3 text-ellipsis md:line-clamp-2">{title}</p>
        </div>
      </section>

      <section className="relative flex w-[50%] flex-col p-2">
        <div className=" flex h-full w-full flex-col justify-between group-hover/post:drop-shadow-lg md:flex-row ">
          <NameAndInfo userName={userName} createdAt={createdAt} />
          <ProfilImage
            authorProfilImg={avatar}
            className="h-12 w-12 rounded-full border md:h-16 md:w-16"
          />
        </div>

        <div className="flex h-full max-h-[50%] flex-wrap items-end gap-1 overflow-hidden">
          <Category categories={categories} />
        </div>
      </section>
    </div>
  );
}
