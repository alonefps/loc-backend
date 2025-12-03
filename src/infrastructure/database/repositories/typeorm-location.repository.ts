import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ILocationRepository } from '@domain/repositories/location.repository.interface';
import { Location } from '@domain/entities/location.entity';
import { LocationModel } from '../models/location.model';
import { LocationMapper } from '../mappers/location.mapper';

@Injectable()
export class TypeOrmLocationRepository implements ILocationRepository {
  constructor(
    @InjectRepository(LocationModel)
    private readonly repository: Repository<LocationModel>,
  ) {}

  async create(location: Location): Promise<Location> {
    const model = LocationMapper.toPersistence(location);
    const savedModel = await this.repository.save(model);
    return LocationMapper.toDomain(savedModel);
  }

  async findById(id: string): Promise<Location | null> {
    const model = await this.repository.findOne({ where: { id } });
    return model ? LocationMapper.toDomain(model) : null;
  }

  async findAll(): Promise<Location[]> {
    const models = await this.repository.find({
      order: { createdAt: 'DESC' },
    });
    return models.map((model) => LocationMapper.toDomain(model));
  }

  async update(location: Location): Promise<Location> {
    const model = LocationMapper.toPersistence(location);
    const updatedModel = await this.repository.save(model);
    return LocationMapper.toDomain(updatedModel);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}


