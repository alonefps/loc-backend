import { Injectable, Inject } from '@nestjs/common';
import { ILocationRepository } from '@domain/repositories/location.repository.interface';
import { Location } from '@domain/entities/location.entity';
import { UpdateLocationDto } from '@domain/dtos/location.dto';

@Injectable()
export class UpdateLocationUseCase {
  constructor(
    @Inject('ILocationRepository')
    private readonly locationRepository: ILocationRepository
  ) {}

  async execute(id: string, data: UpdateLocationDto): Promise<Location> {
    if (!id || id.trim().length === 0) {
      throw new Error('Location ID is required');
    }

    const existingLocation = await this.locationRepository.findById(id);
    if (!existingLocation) {
      throw new Error('Location not found');
    }

    const updatedLocation = existingLocation.update(
      data.name,
      data.description,
      data.latitude,
      data.longitude,
      data.imageUrl,
    );

    return this.locationRepository.update(updatedLocation);
  }
}


