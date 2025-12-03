import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LocationModel } from '@infrastructure/database/models/location.model';
import { TypeOrmLocationRepository } from '@infrastructure/database/repositories/typeorm-location.repository';
import { CreateLocationUseCase } from '@application/use-cases/create-location.use-case';
import { GetLocationByIdUseCase } from '@application/use-cases/get-location-by-id.use-case';
import { ListLocationsUseCase } from '@application/use-cases/list-locations.use-case';
import { UpdateLocationUseCase } from '@application/use-cases/update-location.use-case';
import { DeleteLocationUseCase } from '@application/use-cases/delete-location.use-case';
import { LocationsController } from '@infrastructure/http/controllers/locations.controller';

@Module({
  imports: [TypeOrmModule.forFeature([LocationModel])],
  controllers: [LocationsController],
  providers: [
    {
      provide: 'ILocationRepository',
      useClass: TypeOrmLocationRepository,
    },
    {
      provide: CreateLocationUseCase,
      useFactory: (repository: TypeOrmLocationRepository) => {
        return new CreateLocationUseCase(repository);
      },
      inject: ['ILocationRepository'],
    },
    {
      provide: GetLocationByIdUseCase,
      useFactory: (repository: TypeOrmLocationRepository) => {
        return new GetLocationByIdUseCase(repository);
      },
      inject: ['ILocationRepository'],
    },
    {
      provide: ListLocationsUseCase,
      useFactory: (repository: TypeOrmLocationRepository) => {
        return new ListLocationsUseCase(repository);
      },
      inject: ['ILocationRepository'],
    },
    {
      provide: UpdateLocationUseCase,
      useFactory: (repository: TypeOrmLocationRepository) => {
        return new UpdateLocationUseCase(repository);
      },
      inject: ['ILocationRepository'],
    },
    {
      provide: DeleteLocationUseCase,
      useFactory: (repository: TypeOrmLocationRepository) => {
        return new DeleteLocationUseCase(repository);
      },
      inject: ['ILocationRepository'],
    },
  ],
})
export class LocationsModule {}


