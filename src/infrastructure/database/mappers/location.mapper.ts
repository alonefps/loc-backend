import { Location } from '@domain/entities/location.entity';
import { LocationModel } from '../models/location.model';

export class LocationMapper {
  static toDomain(model: LocationModel): Location {
    return new Location(
      model.id,
      model.name,
      model.description,
      Number(model.latitude),
      Number(model.longitude),
      model.imageUrl,
      model.createdAt,
      model.updatedAt,
    );
  }

  static toPersistence(domain: Location): LocationModel {
    const model = new LocationModel();
    model.id = domain.id;
    model.name = domain.name;
    model.description = domain.description;
    model.latitude = domain.latitude;
    model.longitude = domain.longitude;
    model.imageUrl = domain.imageUrl;
    model.createdAt = domain.createdAt;
    model.updatedAt = domain.updatedAt;
    return model;
  }
}


