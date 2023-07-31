'use client';

import { useState, useTransition } from 'react';
import { signIn } from 'next-auth/react';
import Input from '@/components/input/input';
import Button from '@/components/button/button';
import { LoginRequestResult } from '@/app/(guestRoute)/login/page';
import Spinner from '../../loading/spinner';

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

  const userCheckisJoined = async (formData: FormData) => {
    startTransition(async () => {
      const user = await getUser(formData);
      if (!user.ok) {
        setLoginState({ isEmailOk: false, errorMessage: user.error.message });
      }
      if (user.ok && !user.data) {
        setLoginState({ isEmailOk: false, errorMessage: user.message });
      }
      if (user.ok && user.data) {
        setLoginState({ isEmailOk: true, email: user.data.email });
      }
    });
  };

  const onLogin = async (formData: FormData) => {
    if (!loginState.isEmailOk) {
      return alert('올바르지 않은 접근입니다.');
    }
    const password = formData.get('password') as string;

    startTransition(async () => {
      await signIn('credentials', {
        email: loginState.email,
        password,
        callbackUrl: '/',
      });
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
        <span className="text-red-300  text-xs px-1">
          {errorMessage ?? ''}
          {loginState.isEmailOk && (
            <p
              className="text-blue-300 underline-offset-2 underline cursor-pointer"
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
