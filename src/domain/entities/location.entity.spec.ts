import { Location } from './location.entity';

describe('Location Entity', () => {
  const validData = {
    id: 'test-id',
    name: 'Test Location',
    description: 'Test Description',
    latitude: 40.785091,
    longitude: -73.968285,
    imageUrl: 'https://example.com/image.jpg',
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  it('should create a valid location', () => {
    const location = new Location(
      validData.id,
      validData.name,
      validData.description,
      validData.latitude,
      validData.longitude,
      validData.imageUrl,
      validData.createdAt,
      validData.updatedAt,
    );

    expect(location).toBeDefined();
    expect(location.name).toBe(validData.name);
  });

  it('should throw error if name is empty', () => {
    expect(() => {
      new Location(
        validData.id,
        '',
        validData.description,
        validData.latitude,
        validData.longitude,
        validData.imageUrl,
        validData.createdAt,
        validData.updatedAt,
      );
    }).toThrow('Location name cannot be empty');
  });

  it('should throw error if latitude is invalid', () => {
    expect(() => {
      new Location(
        validData.id,
        validData.name,
        validData.description,
        91,
        validData.longitude,
        validData.imageUrl,
        validData.createdAt,
        validData.updatedAt,
      );
    }).toThrow('Latitude must be between -90 and 90');
  });

  it('should throw error if longitude is invalid', () => {
    expect(() => {
      new Location(
        validData.id,
        validData.name,
        validData.description,
        validData.latitude,
        181,
        validData.imageUrl,
        validData.createdAt,
        validData.updatedAt,
      );
    }).toThrow('Longitude must be between -180 and 180');
  });

  it('should throw error if imageUrl is invalid', () => {
    expect(() => {
      new Location(
        validData.id,
        validData.name,
        validData.description,
        validData.latitude,
        validData.longitude,
        'invalid-url',
        validData.createdAt,
        validData.updatedAt,
      );
    }).toThrow('Invalid image URL');
  });

  it('should update location correctly', () => {
    const location = new Location(
      validData.id,
      validData.name,
      validData.description,
      validData.latitude,
      validData.longitude,
      validData.imageUrl,
      validData.createdAt,
      validData.updatedAt,
    );

    const updated = location.update('New Name', undefined, undefined, undefined, undefined);

    expect(updated.name).toBe('New Name');
    expect(updated.description).toBe(validData.description);
  });
});

