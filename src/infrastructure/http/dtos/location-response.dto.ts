import { ApiProperty } from '@nestjs/swagger';

export class LocationResponseDto {
  @ApiProperty({ example: '550e8400-e29b-41d4-a716-446655440000' })
  id: string;

  @ApiProperty({ example: 'Central Park' })
  name: string;

  @ApiProperty({ example: 'A large public park in New York City' })
  description: string;

  @ApiProperty({ example: 40.785091 })
  latitude: number;

  @ApiProperty({ example: -73.968285 })
  longitude: number;

  @ApiProperty({ example: 'https://example.com/image.jpg' })
  imageUrl: string;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  createdAt: Date;

  @ApiProperty({ example: '2024-01-01T00:00:00.000Z' })
  updatedAt: Date;
}


