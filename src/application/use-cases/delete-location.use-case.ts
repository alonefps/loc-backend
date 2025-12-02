import { ILocationRepository } from '@domain/repositories/location.repository.interface';

export class DeleteLocationUseCase {
  constructor(private readonly locationRepository: ILocationRepository) {}

  async execute(id: string): Promise<void> {
    if (!id || id.trim().length === 0) {
      throw new Error('Location ID is required');
    }

    const existingLocation = await this.locationRepository.findById(id);
    if (!existingLocation) {
      throw new Error('Location not found');
    }

    await this.locationRepository.delete(id);
  }
}

