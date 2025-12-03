import { Injectable, Inject } from '@nestjs/common';
import { ILocationRepository } from '@domain/repositories/location.repository.interface';
import { Location } from '@domain/entities/location.entity';

@Injectable()
export class GetLocationByIdUseCase {
  constructor(
    @Inject('ILocationRepository')
    private readonly locationRepository: ILocationRepository
  ) {}

  async execute(id: string): Promise<Location | null> {
    if (!id || id.trim().length === 0) {
      throw new Error('Location ID is required');
    }

    return this.locationRepository.findById(id);
  }
}


