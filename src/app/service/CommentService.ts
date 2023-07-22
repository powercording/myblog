import { authOptions } from '@/lib/nextAuth/options';
import { getServerSession } from 'next-auth';
import { revalidatePath } from 'next/cache';

const host = process.env.LOCALHOST;

class CommentService {
  private static instance: CommentService;

  constructor() {
    if (CommentService.instance) {
      throw new Error(
        'Error: Instantiation failed: Use CommentService.getInstance() instead of new.',
      );
    }
    CommentService.instance = this;
  }

  public static getInstance(): CommentService {
    if (!CommentService.instance) {
      CommentService.instance = new CommentService();
    }
    return this.instance;
  }

  insertComment = async (comment: string, postId: number) => {
    const session = await getServerSession(authOptions);

    if (comment.trim() === '' || !session || !session.user) {
      return null;
    }

    const commentData = {
      content: comment,
      userName: session.user.name,
      postId: postId,
    };

    try {
      const result = await fetch(`${host}/api/comment`, {
        method: 'POST',
        body: JSON.stringify(commentData),
        next: {
          tags: [`post`],
        },
      });
      return result;
    } catch (e) {
      console.log(e);
      return null;
    }
  };

  deleteComment = async (deleteApi: string, deleteId: number) => {
    try {
      const result = await fetch(`${deleteApi}/${deleteId}`, {
        method: 'DELETE',
        next: {
          tags: [`post`],
        },
      });

      if (result.status !== 200) {
        return;
      }
    } catch (e) {
      console.log(e);
    }
  };

  updateComment = async (comment: string, id: number) => {};

  getComment = async (postId: number) => {};

  withTryCatch<F extends (...args: any[]) => any>(fn: F): WithTryCatch<F> {
    return async (...args) => {
      try {
        return await fn(...args);
      } catch (e) {
        console.log(e);
        return null;
      }
    };
  }

  withGet = this.withTryCatch(this.getComment);
}

type WithTryCatch<F extends (...args: any[]) => any> = (
  ...args: Parameters<F>
) => Promise<ReturnType<F>>;


 function withTryCatch<F extends (...args: any[]) => any>(fn: F): WithTryCatch<F> {
    return async (...args) => {
      try {
        return await fn(...args);
      } catch (e) {
        console.log(e);
        return null;
      }
    };
  }


const commentService = CommentService.getInstance();
export default commentService;
