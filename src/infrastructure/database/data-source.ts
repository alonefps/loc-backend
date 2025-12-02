import { DataSource, DataSourceOptions } from 'typeorm';
import { LocationModel } from './models/location.model';

export const dataSourceOptions: DataSourceOptions = {
  type: process.env.DB_TYPE === 'postgres' ? 'postgres' : 'sqlite',
  database: process.env.DB_DATABASE || 'database.sqlite',
  ...(process.env.DB_TYPE === 'postgres' && {
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || '5432'),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
  }),
  entities: [LocationModel],
  synchronize: true,
  logging: process.env.NODE_ENV === 'development',
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

