'use server';

import { database } from '@/database/databaseClient';
import { token } from '@/lib/TokenSchema/schema';
import { user as User } from '@/lib/UserSchema/schema';
import { InferModel, eq, sql } from 'drizzle-orm';
import { withTryCatch } from './withService';
import { sendEmail } from './emailService';

type UserModel = InferModel<typeof User>;
type TokenModel = InferModel<typeof token>;

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

const findUser = withTryCatch(async (email: string): Promise<UserModel | CustomError | {}> => {
  if (!validateEmail(email)) {
    return errorCreate(400, '올바른 이메일을 입력하세요');
  }
  const user = await database.query.user.findFirst({ where: eq(User.email, email) });
  return user ?? {};
});

//FIXME: 해당 함수를 nextauth 에 사용해보고, 안되면 끝내버리자.
const findToken = async (password: string): Promise<TokenModel | CustomError> => {
  if (validatePassword(password)) {
    return errorCreate(400, '올바른 비밀번호를 입력하세요1');
  }

  const loginToken = await database.query.token.findFirst({ where: eq(token.payload, password) });

  if (!loginToken) {
    return errorCreate(400, '올바른 비밀번호를 입력하세요2');
  }

  return loginToken;
};

const createToken = withTryCatch(async (userId: number, payload: number): Promise<void> => {
  const loginToken = await database.insert(token).values({ payload: `${payload}`, userId });
  //TODO: 토큰 검증 로직?
});

const authRequest = withTryCatch(async (user: UserModel) => {
  const payload = Math.floor(100000 + Math.random() * 900000);
  const [token, email] = await Promise.allSettled([
    createToken(user.id, payload),
    sendEmail(user.email, payload),
  ]);

  if (email.status === 'rejected' || token.status === 'rejected') {
    return errorCreate(500, '이메일 전송에 실패했습니다. 다시 시도해주세요');
  }

  return { ok: true, status: 200 };
});

const join = async (email: string): Promise<{ status: number, ok: boolean } | CustomError> => {
  const user = await findUser(email);

  if ('error' in user) {
    return errorCreate(user.status, user.error.message);
  }

  if ('email' in user) {
    return errorCreate(400, '이미 가입된 이메일입니다.');
  }

  const dafualtImageIndex = Math.round(Math.random() * 10);
  const PROFILE_IMAGE_URL = 'https://my--blog.s3.ap-northeast-2.amazonaws.com/defaultprofile';

  const joinUser = await database.insert(User).values({
    email,
    name: email,
    updatedAt: sql`(CURRENT_TIMESTAMP(3))`,
    avatar: `${PROFILE_IMAGE_URL}/${dafualtImageIndex}.jpg`,
  });

  if (joinUser.rowsAffected === 0 || joinUser.rowsAffected === undefined) {
    return errorCreate(500, '회원가입이 실패 했습니다. 다시 시도해주세요');
  }

  // TODO: or Redirect to login page
  return { status: 200, ok: true };
};

const login = async (email: string, password: string): Promise<void> => {
  // 현재 nextauth 에서 authService 클래스 인스턴스호출하여 메서드 실행시 오류가 발생하고 있음.
};

export { join, login, authRequest, findUser };
