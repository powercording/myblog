'use client';

import { useChat } from 'ai/react';
import { ChangeEvent } from 'react';
import { AiOutlineEnter } from 'react-icons/ai';
import AiChatRow from './aiChatRow';

export default function AiChatForm() {
  // const { completion, input, handleInputChange, handleSubmit } =
  //   useCompletion();
  const { messages, input, handleInputChange, handleSubmit } = useChat();

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    handleInputChange(e);

    const target = e.target as HTMLTextAreaElement;
    target.style.height = 'auto';
    target.style.height = `${target.scrollHeight}px`;
  };

  const handleEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      e.currentTarget.form?.requestSubmit();
    }
  };

  return (
    <>
      <section className="w-full self-center py-14 lg:w-[600px]">
        {messages.length ? (
          messages.map(message => {
            return <AiChatRow key={message.id} message={message} />;
          })
        ) : (
          <p className="mt-5 text-center text-sm text-gray-400">인공지능과 채팅을 해보세요!</p>
        )}
      </section>

      <form
        className="fixed bottom-0 h-auto w-full space-y-2 self-center rounded-tl-lg rounded-tr-lg border bg-white p-2 text-center lg:w-[600px]"
        onSubmit={handleSubmit}
      >
        <div className="bg-background relative flex max-h-60 w-full grow flex-col overflow-hidden rounded-md border px-8 sm:px-12">
          <textarea
            rows={1}
            style={{ height: '62px !important' }}
            className="h-auto w-full resize-none bg-transparent px-4 py-[1.3rem] text-black focus-within:outline-none sm:text-sm"
            value={input}
            onChange={handleChange}
            onKeyDown={handleEnter}
            placeholder="무엇을 도와드릴까요?"
          />
          <button type="submit" className="absolute right-2 p-5 text-black">
            <AiOutlineEnter />
          </button>
        </div>
        <input
          disabled
          placeholder="powered by powercording"
          className="w-full bg-transparent text-center "
        />
      </form>
    </>
  );
}
