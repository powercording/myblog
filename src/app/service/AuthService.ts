import { token } from '@/lib/TokenSchema/schema';
import { user as User } from '@/lib/UserSchema/schema';
import { InferModel } from 'drizzle-orm';

type UserModel = InferModel<typeof User>;
type TokenModel = InferModel<typeof token>;
export type CustomError = { error: { message: string }; status: number };
const host = process.env.LOCALHOST;

class AuthService {
  private static instance: AuthService;

  constructor() {
    if (AuthService.instance) {
      throw new Error('Error: Instantiation failed: Use Authservice.getInstance() instead of new.');
    }
    AuthService.instance = this;
  }

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return this.instance;
  }

  errorCreate = (status: number, message: string): CustomError => {
    return { error: { message }, status };
  };

  validateEmail = (email: string): boolean => {
    return /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(email);
  };

  validatePassword = (password: string): boolean => {
    if (Number.isNaN(+password)) return false;
    return Number.isInteger(+password);
  };

  findUser = async (email: string): Promise<UserModel | CustomError> => {
    if (!this.validateEmail(email)) {
      return this.errorCreate(400, '올바른 이메일을 입력하세요');
    }

    const getUserFromApi = await fetch(`${host}/api/user`, {
      method: 'POST',
      body: JSON.stringify({ email }),
      cache: 'no-cache',
    });

    const user = await getUserFromApi.json();

    if (getUserFromApi.status !== 200) {
      // throw error??
      return this.errorCreate(500, '요청을 처리하지 못했습니다. 다시 시도해주세요');
    }

    if (Object.keys(user).length === 0) {
      return user; // empty User === 회원이 아님.(가입 가능)
    }

    return user;
  };

  findToken = async (password: string): Promise<TokenModel | null> => {
    if (!this.validatePassword(password)) {
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

  createToken = async (userId: number, payload: number): Promise<void> => {
    await fetch(`${host}/api/token`, {
      method: 'POST',
      body: JSON.stringify({ payload, userId }),
      cache: 'no-cache',
    });
  };

  sendEmail = async (email: string, payload: number): Promise<void> => {
    console.log(email);
    await fetch(`${host}/api/mail`, {
      method: 'POST',
      body: JSON.stringify({ email, payload }),
      cache: 'no-cache',
    });
  };

  authRequest = async (user: UserModel): Promise<void> => {
    const payload = Math.floor(100000 + Math.random() * 900000);

    await Promise.allSettled([
      this.createToken(user.id, payload),
      this.sendEmail(user.email, payload),
    ]);
  };

  login = async (email: string, password: string): Promise<void> => {
    // 현재 nextauth 에서 authService 클래스 인스턴스호출하여 메서드 실행시 오류가 발생하고 있음.
  };

  join = async (email: string): Promise<UserModel | CustomError> => {
    const user = await this.findUser(email);

    if ('error' in user) {
      return this.errorCreate(user.status, user.error.message);
    }

    if ('email' in user) {
      return this.errorCreate(400, '이미 가입된 이메일입니다.');
    }

    const userInsertResult = await fetch(`${host}/api/user`, {
      method: 'PUT',
      body: JSON.stringify({ email }),
      cache: 'no-cache',
    });

    const result = await userInsertResult.json();

    if (userInsertResult.status !== 200) {
      return this.errorCreate(500, '회원가입이 실패 했습니다. 다시 시도해주세요');
    }

    // TODO: or Redirect to login page
    return result;
  };
}
const authService = AuthService.getInstance();
export default authService;
