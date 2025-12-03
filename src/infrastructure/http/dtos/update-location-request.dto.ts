import { IsString, IsOptional, IsNumber, Min, Max, IsUrl } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateLocationRequestDto {
  @ApiPropertyOptional({
    description: 'Location name',
    example: 'Central Park',
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiPropertyOptional({
    description: 'Location description',
    example: 'A large public park in New York City',
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiPropertyOptional({
    description: 'Latitude coordinate',
    example: 40.785091,
    minimum: -90,
    maximum: 90,
  })
  @IsOptional()
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude?: number;

  @ApiPropertyOptional({
    description: 'Longitude coordinate',
    example: -73.968285,
    minimum: -180,
    maximum: 180,
  })
  @IsOptional()
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude?: number;

  @ApiPropertyOptional({
    description: 'URL of location image',
    example: 'https://example.com/image.jpg',
  })
  @IsOptional()
  @IsUrl()
  imageUrl?: string;
}


