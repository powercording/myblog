import { authOptions } from '@/lib/nextAuth/options';
import NextAuth from 'next-auth';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
