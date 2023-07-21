import Category from './category';
import NameAndInfo from './nameAndInfo';
import ProfilImage from './profilImage';
import { InferModel } from 'drizzle-orm';
import { user } from '@/lib/UserSchema/schema';

export type Post = {
  id: number;
  title: string;
  content: string;
  createdAt: string;
  userName: string;
  categories: string | null;
  createdBy: InferModel<typeof user>;
};

const categories = ['category1', 'category2', 'category3', 'category4'];

type ArticleProps = { article: Post };

export default function Article({ article }: ArticleProps) {
  const { userName, title, createdAt, createdBy, categories } = article;

  const { avatar } = createdBy;
  return (
    <div className="w-full rounded-md flex h-48 bg-white cursor-pointer text-gray-400 group/post hover:bg-slate-100">
      <section
        className="w-[50%] p-2"
        style={{
          backgroundImage: `url(/defaultLanguage/${categories}.jpeg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="w-full h-full text-lg md:text-2xl text-blue-400 font-extrabold group-hover/post:drop-shadow-lg">
          <p className="line-clamp-3 md:line-clamp-2 text-ellipsis">{title}</p>
        </div>
      </section>

      <section className="p-2 w-[50%] flex flex-col relative">
        <div className=" h-full flex flex-col md:flex-row justify-between group-hover/post:drop-shadow-lg">
          <NameAndInfo userName={userName} createdAt={createdAt} />
          <ProfilImage
            authorProfilImg={avatar}
            className="w-12 md:w-16 h-12 md:h-16 border rounded-full"
          />
        </div>

        <div className="h-full flex items-end flex-wrap max-h-[50%] overflow-hidden gap-1">
          <Category categories={categories} />
        </div>
      </section>
    </div>
  );
}
