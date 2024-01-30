import { drizzle } from 'drizzle-orm/planetscale-serverless';
import { connect } from '@planetscale/database';
import * as userSchema from '@/lib/UserSchema/schema';
import * as postSchema from '@/lib/PostSchema/schema';
import * as tokenSchema from '@/lib/TokenSchema/schema';
import * as commentSchema from '@/lib/CommentSchema/schema';
import * as autoSaveSchema from '@/lib/AutosaveSchema/schema';

const databaseConnection = connect({
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
});

export const database = drizzle(databaseConnection, {
  schema: {
    ...userSchema,
    ...postSchema,
    ...tokenSchema,
    ...commentSchema,
    ...autoSaveSchema,
  },
});
