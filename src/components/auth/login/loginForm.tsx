'use client';

import { useState, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import { LoginRequestResult } from '@/app/(guestRoute)/login/page';
import Spinner from '../../loading/spinner';
import { useToast } from '@/context/useToast';
import { useRouter } from 'next/navigation';

type LoginOkProp = {
  isEmailOk: true;
  email: string;
};

type LoginFailProp = {
  isEmailOk: false;
  errorMessage?: string;
};

type LoginProp = LoginOkProp | LoginFailProp;

interface LoginForm {
  getUser: (formData: FormData) => Promise<LoginRequestResult>;
}

export default function LoginForm({ getUser }: LoginForm) {
  const [loginState, setLoginState] = useState<LoginProp>({ isEmailOk: false });
  const [isPending, startTransition] = useTransition();
  const { addToast } = useToast();
  const router = useRouter();

  const userCheckisJoined = async (formData: FormData) => {
    startTransition(async () => {
      const user = await getUser(formData);
      if (!user.ok) {
        addToast(user.error.message, { type: 'warn' });
        setLoginState({ isEmailOk: false, errorMessage: user.error.message });
      }
      if (user.ok && !user.data) {
        addToast(user.message, { type: 'warn' });
        setLoginState({ isEmailOk: false, errorMessage: user.message });
      }
      if (user.ok && user.data) {
        setLoginState({ isEmailOk: true, email: user.data.email });
      }
    });
  };

  const onLogin = async (formData: FormData) => {
    if (!loginState.isEmailOk) {
      addToast('올바르지 않은 접근입니다.', { type: 'warn' });
      return alert('올바르지 않은 접근입니다.');
    }
    const password = formData.get('password') as string;

    startTransition(async () => {
      const path = await signIn('credentials', {
        email: loginState.email,
        password,
        callbackUrl: '/',
        redirect: false,
      });
      addToast(`환영합니다 ${loginState.email}`, { type: 'success' });
      router.push(path.url);
      router.refresh();
    });
  };

  const reSetState = () => {
    setLoginState({ isEmailOk: false });
  };

  const errorMessage = loginState.isEmailOk === true ? null : loginState.errorMessage;
  const loginButtonText = isPending ? (
    <Spinner />
  ) : loginState.isEmailOk ? (
    '로그인'
  ) : (
    '임시 비밀번호 받기'
  );
  const action = loginState.isEmailOk ? onLogin : userCheckisJoined;

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <form className="grid gap-5" action={action}>
        <Input
          type="email"
          name="email"
          placeholder="이메일"
          required
          disabled={loginState.isEmailOk}
        />
        <Input
          type="text"
          name="password"
          placeholder="비밀번호"
          required
          disabled={!loginState.isEmailOk}
        />
        <Button type="submit">{loginButtonText}</Button>
        <span className="px-1  text-xs text-red-300">
          {errorMessage ?? ''}
          {loginState.isEmailOk && (
            <p
              className="cursor-pointer text-blue-300 underline underline-offset-2"
              onClick={reSetState}
            >
              다시 입력하기
            </p>
          )}
        </span>
      </form>
    </main>
  );
}
