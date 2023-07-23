'use server';

import { authOptions } from '@/lib/nextAuth/options';
import { getServerSession } from 'next-auth';
import ResponseBuilder from './ResponseBuilder';

export type WithTryCatch<F extends (...args: any[]) => any> = (
  ...args: Parameters<F>
) => Promise<ReturnType<F>>;

export const withTryCatchSession = <F extends (...args: any[]) => any>(fn: F): WithTryCatch<F> => {
  return async (...args) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      return new ResponseBuilder()
        .setOk(false)
        .setStatus(401)
        .setError({ message: '로그인이 필요합니다.' })
        .build();
    }
    try {
      return await fn(...args, session);
    } catch (e: any) {
      console.log(e);
      return new ResponseBuilder()
        .setOk(false)
        .setStatus(401)
        .setError({ message: e.message })
        .build();
    }
  };
};

export const withTryCatch = <F extends (...args: any[]) => any>(fn: F): WithTryCatch<F> => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (e: any) {
      console.log(e);
      return new ResponseBuilder()
        .setOk(false)
        .setStatus(401)
        .setError({ message: e.message })
        .build();
    }
  };
};
