'use server';

import { database } from '@/database/databaseClient';
import { token } from '@/lib/TokenSchema/schema';
import { user as User } from '@/lib/UserSchema/schema';
import { InferModel, eq, sql } from 'drizzle-orm';
import { withTryCatch } from './withService';
import { sendEmail } from './emailService';
import ResponseBuilder from './ResponseBuilder';

type UserModel = InferModel<typeof User>;

export type CustomError = { error: { message: string }; status: number };
const host = process.env.NEXT_PUBLIC_URL;

const validateEmail = (email: string): boolean => {
  return /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
};

const validatePassword = (password: string): boolean => {
  if (Number.isNaN(+password)) return false;
  return Number.isInteger(+password);
};

const findUser = withTryCatch(async (email: string) => {
  if (!validateEmail(email)) {
    return new ResponseBuilder()
      .setOk(false)
      .setStatus(400)
      .setError({ message: '올바른 이메일을 입력하세요' })
      .build();
  }
  const user = await database.query.user.findFirst({ where: eq(User.email, email) });
  if (!user) {
    return new ResponseBuilder()
      .setOk(true)
      .setStatus(200)
      .setData(user)
      .setMessage('가입되어있지 않은 이메일이에요')
      .build();
  }
  return new ResponseBuilder().setOk(true).setStatus(200).setData(user).build();
});

//FIXME: 해당 함수를 nextauth 에 사용해보고, 안되면 끝내버리자.
const findToken = async (password: string) => {
  if (validatePassword(password)) {
    return new ResponseBuilder()
      .setOk(false)
      .setStatus(400)
      .setError({ message: '비밀번호를 확인해주세요' })
      .build();
  }

  const loginToken = await database.query.token.findFirst({ where: eq(token.payload, password) });

  if (!loginToken) {
    return new ResponseBuilder()
      .setOk(false)
      .setStatus(400)
      .setError({ message: '비밀번호를 확인해주세요' })
      .build();
  }

  return new ResponseBuilder().setOk(true).setStatus(200).setData(loginToken).build();
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
    return new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setError({ message: '이메일전송을 실패했어요' })
      .build();
  }
  return new ResponseBuilder().setOk(true).setStatus(200).build();
});

const join = async (email: string) => {
  const user = await findUser(email);

  if (!user.ok) {
    return new ResponseBuilder()
      .setOk(false)
      .setStatus(user.status)
      .setError({ message: user.error?.message as string })
      .build();
  }

  if (user.ok && user.data) {
    return new ResponseBuilder()
      .setOk(false)
      .setStatus(400)
      .setError({ message: '이미 가입된 이메일입니다.' })
      .build();
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
    return new ResponseBuilder()
      .setOk(false)
      .setStatus(500)
      .setError({ message: '회원가입이 되지 않았어요. 다시 시도해주세요' })
      .build();
  }

  // TODO: or Redirect to login page
  return new ResponseBuilder().setOk(true).setStatus(200).build();
};

const login = async (email: string, password: string): Promise<void> => {
  // 현재 nextauth 에서 authService 클래스 인스턴스호출하여 메서드 실행시 오류가 발생하고 있음.
};

export { join, login, authRequest, findUser };
