// 'use client';

// import ReactMarkdown from 'react-markdown';
// import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
// import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
// import rehypeRaw from 'rehype-raw';
// import remarkGfm from 'remark-gfm';

// export type MarkdownViewerType = {
//   markdown?: string;
// };

// export default function MarkdownViewer({ markdown }: MarkdownViewerType) {
//   return (
//     <ReactMarkdown
//       className="markdown prose max-w-full items-center  overflow-y-auto overflow-ellipsis break-words px-5 py-6 text-gray-200
//        prose-h1:text-gray-50  prose-h2:text-blue-200 prose-h3:text-green-200 prose-a:text-red-400
//         prose-blockquote:text-sky-300 prose-strong:text-gray-200 prose-pre:p-0 prose-table:text-gray-200 prose-thead:text-white
//         prose-th:text-white"
//       components={{
//         code({ inline, className, children, ...props }) {
//           const match = /language-(\w+)/.exec(className || '');
//           return !inline && match ? (
//             <SyntaxHighlighter
//               {...props}
//               style={vscDarkPlus}
//               language={match[1] ?? 'jsx'}
//               PreTag="div"
//               customStyle={{ margin: 0 }}
//             >
//               {String(children).replace(/\n$/, '')}
//             </SyntaxHighlighter>
//           ) : (
//             <code {...props}>{children}</code>
//           );
//         },
//       }}
//       remarkPlugins={[remarkGfm]}
//       rehypePlugins={[rehypeRaw]}
//     >
//       {markdown ?? ''}
//     </ReactMarkdown>
//   );
// }
