'use server';

import { authOptions } from '@/lib/nextAuth/options';
import { getServerSession } from 'next-auth';

type WithTryCatch<F extends (...args: any[]) => any> = (
  ...args: Parameters<F>
) => Promise<ReturnType<F>>;

export const withTryCatchSession = <F extends (...args: any[]) => any>(fn: F): WithTryCatch<F> => {
  return async (...args) => {
    const session = await getServerSession(authOptions);
    if (!session) {
      return null;
    }
    try {
      return await fn(...args, session);
    } catch (e) {
      console.log(e);
      return null;
    }
  };
};

export const withTryCatch = <F extends (...args: any[]) => any>(fn: F): WithTryCatch<F> => {
  return async (...args) => {
    try {
      return await fn(...args);
    } catch (e) {
      console.log(e);
      return null;
    }
  };
};
