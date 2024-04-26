import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env' });

export const jwtConstants = {
  secret: process.env.JWT_SECRET,
};
