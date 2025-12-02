import { ILocationRepository } from '@domain/repositories/location.repository.interface';
import { Location } from '@domain/entities/location.entity';
import { CreateLocationDto } from '@domain/dtos/location.dto';
import { randomUUID } from 'crypto';

export class CreateLocationUseCase {
  constructor(private readonly locationRepository: ILocationRepository) {}

  async execute(data: CreateLocationDto): Promise<Location> {
    const location = new Location(
      randomUUID(),
      data.name,
      data.description,
      data.latitude,
      data.longitude,
      data.imageUrl,
      new Date(),
      new Date(),
    );

    return this.locationRepository.create(location);
  }
}

