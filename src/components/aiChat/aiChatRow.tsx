import { Message } from 'ai';
import { FiUser } from 'react-icons/fi';
import { VscOctoface } from 'react-icons/vsc';
import { dateFormat } from '@/lib/util/dateTimeFormatter';
import Preview from '../markdown/Preview';

type AiChatRowProps = {
  message: Message;
};

export default function AiChatRow({ message }: AiChatRowProps) {
  const { role, content, createdAt } = message;

  return (
    <div className={`flex justify-between gap-5 rounded-md px-5 py-4 shadow-md`}>
      <div className="basis-1/12 text-center">
        {role === 'user' ? <FiUser size={'1.5rem'} /> : <VscOctoface size={'1.5rem'} />}
      </div>
      <div className="w-full basis-11/12 self-start">
        <Preview doc={content}></Preview>
        {createdAt && <p className="text-end text-xs text-gray-400">{dateFormat(createdAt)}</p>}
      </div>
    </div>
  );
}
