import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
dotenvConfig({ path: '.env' });

export const config: DataSourceOptions = {
  type: 'postgres',
  host: `${process.env.DATABASE_HOST}`,
  port: process.env.DATABASE_PORT as unknown as number,
  username: `${process.env.DATABASE_USERNAME}`,
  password: `${process.env.DATABASE_PASSWORD}`,
  database: `${process.env.DATABASE_NAME}`,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/migrations/*{.ts,.js}'],
  synchronize: false,
  namingStrategy: new SnakeNamingStrategy(),
};

const dataSource = new DataSource(config);
export default dataSource;
