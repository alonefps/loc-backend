import { Injectable, Inject } from '@nestjs/common';
import { ILocationRepository } from '@domain/repositories/location.repository.interface';
import { Location } from '@domain/entities/location.entity';

@Injectable()
export class ListLocationsUseCase {
  constructor(
    @Inject('ILocationRepository')
    private readonly locationRepository: ILocationRepository
  ) {}

  async execute(): Promise<Location[]> {
    return this.locationRepository.findAll();
  }
}


