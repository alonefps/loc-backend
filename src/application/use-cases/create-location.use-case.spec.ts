import { Test, TestingModule } from '@nestjs/testing';
import { CreateLocationUseCase } from './create-location.use-case';
import { ILocationRepository } from '@domain/repositories/location.repository.interface';
import { Location } from '@domain/entities/location.entity';

describe('CreateLocationUseCase', () => {
  let useCase: CreateLocationUseCase;
  let repository: ILocationRepository;

  beforeEach(async () => {
    const mockRepository: Partial<ILocationRepository> = {
      create: jest.fn(),
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CreateLocationUseCase,
        {
          provide: 'ILocationRepository',
          useValue: mockRepository,
        },
      ],
    }).compile();

    useCase = module.get<CreateLocationUseCase>(CreateLocationUseCase);
    repository = module.get<ILocationRepository>('ILocationRepository');
  });

  it('should be defined', () => {
    expect(useCase).toBeDefined();
  });

  it('should create a location successfully', async () => {
    const mockData = {
      name: 'Test Location',
      description: 'Test Description',
      latitude: 40.785091,
      longitude: -73.968285,
      imageUrl: 'https://example.com/image.jpg',
    };

    const mockLocation = new Location(
      'test-id',
      mockData.name,
      mockData.description,
      mockData.latitude,
      mockData.longitude,
      mockData.imageUrl,
      new Date(),
      new Date(),
    );

    jest.spyOn(repository, 'create').mockResolvedValue(mockLocation);

    const result = await useCase.execute(mockData);

    expect(result).toBeDefined();
    expect(result.name).toBe(mockData.name);
    expect(repository.create).toHaveBeenCalled();
  });
});

