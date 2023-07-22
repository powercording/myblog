'use server';

import { token } from '@/lib/TokenSchema/schema';
import { user as User } from '@/lib/UserSchema/schema';
import { InferModel } from 'drizzle-orm';

type UserModel = InferModel<typeof User>;
type TokenModel = InferModel<typeof token>;
type EmailResult = {
  ok: boolean;
  status: number;
  error?: { message: string } | null;
};
export type CustomError = { error: { message: string }; status: number };
const host = process.env.NEXT_PUBLIC_URL;

const errorCreate = (status: number, message: string): CustomError => {
  return { error: { message }, status };
};

const validateEmail = (email: string): boolean => {
  return /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
};

const validatePassword = (password: string): boolean => {
  if (Number.isNaN(+password)) return false;
  return Number.isInteger(+password);
};

const findUser = async (email: string): Promise<UserModel | CustomError> => {
  if (!validateEmail(email)) {
    return errorCreate(400, '올바른 이메일을 입력하세요');
  }
  console.log(host);
  const getUserFromApi = await fetch(`${host}/api/user`, {
    method: 'POST',
    body: JSON.stringify({ email }),
    cache: 'no-cache',
  });

  const user = await getUserFromApi.json();

  if (getUserFromApi.status !== 200) {
    return errorCreate(500, '요청을 처리하지 못했습니다. 다시 시도해주세요');
  }

  if (Object.keys(user).length === 0) {
    return user; // empty User === 회원이 아님.(가입 가능)
  }

  return user;
};

//FIXME: 해당 함수를 nextauth 에 사용해보고, 안되면 끝내버리자.
const findToken = async (password: string): Promise<TokenModel | null> => {
  if (validatePassword(password)) {
    return Promise.resolve(null);
  }

  const getTokenFromApi = await fetch(`${host}/api/token/${password}`, {
    method: 'GET',
    cache: 'no-cache',
  });

  const token = await getTokenFromApi.json();

  if (getTokenFromApi.status !== 200 || Object.keys(token).length === 0) {
    // throw error??
    return null;
  }

  return token;
};

const createToken = async (userId: number, payload: number): Promise<void> => {
  const tokenCreateResult = await fetch(`${host}/api/token`, {
    method: 'POST',
    body: JSON.stringify({ payload, userId }),
    cache: 'no-cache',
  });
};

const sendEmail = async (email: string, payload: number) => {
  const sendEmail = await fetch(`${host}/api/mail`, {
    method: 'POST',
    body: JSON.stringify({ email, payload }),
    cache: 'no-cache',
  });

  const sendEmailResult: EmailResult = await sendEmail.json();
  if (sendEmailResult.error) {
    return errorCreate(sendEmailResult.status, sendEmailResult.error.message);
  }

  return sendEmailResult;
};

const authRequest = async (user: UserModel) => {
  const payload = Math.floor(100000 + Math.random() * 900000);
  const [token, email] = await Promise.allSettled([
    createToken(user.id, payload),
    sendEmail(user.email, payload),
  ]);

  if (email.status === 'rejected' || token.status === 'rejected') {
    return errorCreate(500, '이메일 전송에 실패했습니다. 다시 시도해주세요');
  }

  return { ok: true };
};

const join = async (email: string): Promise<UserModel | CustomError> => {
  const user = await findUser(email);

  if ('error' in user) {
    return errorCreate(user.status, user.error.message);
  }

  if ('email' in user) {
    return errorCreate(400, '이미 가입된 이메일입니다.');
  }

  const userInsertResult = await fetch(`${host}/api/user`, {
    method: 'PUT',
    body: JSON.stringify({ email }),
    cache: 'no-cache',
  });

  const result = await userInsertResult.json();

  if (userInsertResult.status !== 200) {
    return errorCreate(500, '회원가입이 실패 했습니다. 다시 시도해주세요');
  }

  // TODO: or Redirect to login page
  return result;
};

const login = async (email: string, password: string): Promise<void> => {
  // 현재 nextauth 에서 authService 클래스 인스턴스호출하여 메서드 실행시 오류가 발생하고 있음.
};

export { join, login, authRequest, findUser };
