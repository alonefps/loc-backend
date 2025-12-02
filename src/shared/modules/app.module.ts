import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from '@infrastructure/database/data-source';
import { LocationsModule } from './locations.module';
import { HealthController } from '@infrastructure/http/controllers/health.controller';

@Module({
  imports: [TypeOrmModule.forRoot(dataSourceOptions), LocationsModule],
  controllers: [HealthController],
})
export class AppModule {}

