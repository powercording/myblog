import ProfilImage from '../article/profilImage';
import DeleteIconButton from '../button/deleteIconButton';
import MarkdownViewer from '../markdown/markdownViewer';
import { dateFormatter } from '@/lib/util/dateTimeFormatter';
import { TiDelete } from 'react-icons/ti';

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
};

export default function Comment({ comment }: Comment) {
  return (
    <div className="flex gap-2 relative ">
      <ProfilImage
        authorProfilImg={comment.commentBy.avatar}
        className="w-8 md:w-10 h-8 md:h-10 border rounded-full"
      />

      <div className="comment-border border w-full rounded-md relative">
        <address className="py-1 px-3 bg-slate-700 rounded-t-md">
          {comment.userName}{' '}
          <span className="text-sm ml-3">{dateFormatter(comment.createdAt)}</span>
          {/* <BsFillPencilFill /> */}
        </address>
        <DeleteIconButton
          deleteApi="/api/comment"
          className="absolute right-3 top-2"
          deleteId={comment.id}
          icon={<TiDelete />}
        />
        <MarkdownViewer markdown={comment.content} />
      </div>
    </div>
  );
}
