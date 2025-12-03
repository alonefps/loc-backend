import { Location } from '../entities/location.entity';

export interface ILocationRepository {
  create(location: Location): Promise<Location>;
  findById(id: string): Promise<Location | null>;
  findAll(): Promise<Location[]>;
  update(location: Location): Promise<Location>;
  delete(id: string): Promise<void>;
}


