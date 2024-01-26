import ProfilImage from '../article/profilImage';
import { dateFormatter } from '@/lib/util/dateTimeFormatter';
import Preview from '../markdown/Preview';

type Comment = {
  comment: {
    id: number;
    content: string;
    createdAt: string;
    userName: string;
    postId: number;
    commentBy: {
      avatar: string | null;
    };
  };
  children?: React.ReactNode;
};

export default function Comment({ comment, children }: Comment) {
  return (
    <div className="relative flex gap-2 ">
      <ProfilImage
        authorProfilImg={comment.commentBy.avatar}
        className="h-8 w-8 rounded-full border md:h-10 md:w-10"
      />

      <div className="comment-border relative w-full rounded-md border">
        <address className="rounded-t-md bg-slate-700 px-3 py-1">
          {comment.userName}{' '}
          <span className="ml-3 text-sm">{dateFormatter(comment.createdAt)}</span>
        </address>
        {children}
        <Preview doc={comment.content} />
      </div>
    </div>
  );
}
