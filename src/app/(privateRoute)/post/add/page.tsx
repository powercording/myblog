import MarkdownSet from '@/components/markdown/markdownSet';
import MarkdownServerViewer from '@/components/markdown/markdownServerViewer';

export default async function AddPost() {
  // TODO: 임시글 있나 조회해서 프랍스 넘 겨주기. -> 마크다운 셋에 임시글 프랍스 인터페이스 작성
  return <MarkdownSet renderType="create" Viewer={MarkdownServerViewer} />;
}
