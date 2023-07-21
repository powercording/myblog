import { InferModel } from 'drizzle-orm';
import { post } from '@/lib/PostSchema/schema';

const host = process.env.LOCALHOST;

type Markdown = Partial<InferModel<typeof post>>;

class PostService {
  private static instance: PostService;

  constructor() {
    if (PostService.instance) {
      throw new Error(
        'Error: Instantiation failed: Use LoginService.getInstance() instead of new.',
      );
    }
    PostService.instance = this;
  }

  public static getInstance(): PostService {
    if (!PostService.instance) {
      PostService.instance = new PostService();
    }
    return this.instance;
  }

  insertPost = async (markdownModel: Markdown) => {
    const result = await fetch(`/api/post`, {
      method: 'POST',
      body: JSON.stringify(markdownModel),
    });
    if (result.status === 200) {
      return (window.location.href = result.url);
    }
  };

  deleteMarkdown = async (id: number) => {
    const deleteResult = await fetch(`/api/post/${id}`, {
      method: 'DELETE',
    });
    if (deleteResult.status === 200) {
      return (window.location.href = '/');
    }
  };

  updateMarkdown = async (markdownModel: Markdown) => {
    const result = await fetch(`/api/post`, {
      method: 'PATCH',
      body: JSON.stringify(markdownModel),
    });
    if (result.status === 200) {
      return (window.location.href = result.url);
    }
  };
}

const postService = PostService.getInstance();
export default postService;
