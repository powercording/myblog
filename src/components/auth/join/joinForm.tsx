'use client';

import Button from '@/components/button/button';
import Input from '@/components/input/input';
import { useState, useTransition } from 'react';
import { CustomError } from '@/service/authService';
import { redirect } from 'next/navigation';
import Spinner from '../../loading/spinner';

interface JoinForm {
  joinAction: (email: string) => Promise<{ status: number; ok: boolean } | CustomError>;
}

export default function JoinForm({ joinAction }: JoinForm) {
  const [errorMessage, setErrorMessage] = useState<string | undefined>(undefined);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = async (formData: FormData) => {
    const email = formData.get('email') as string;
    if (errorMessage) {
      return setErrorMessage(undefined);
    }

    startTransition(async () => {
      const result = await joinAction(email);

      if ('error' in result!) {
        return setErrorMessage(result.error.message);
      }
      if ('status' in result!) {
        result.status === 200 ? alert('가입이 완료되었습니다.') : alert('가입에 실패했습니다.');
        redirect('/login');
      }
    });
  };

  const ButtonText = isPending ? <Spinner /> : errorMessage ? '다시입력' : '가입하기';

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form action={handleSubmit} className="grid gap-5 relative">
        <Input type="email" name="email" placeholder="이메일" required />
        <Button type="submit">{ButtonText}</Button>
        <span className="text-red-300 text-xs px-1">{errorMessage ?? ''}</span>
      </form>
    </main>
  );
}
