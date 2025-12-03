import { IsString, IsNotEmpty, IsNumber, Min, Max, IsUrl } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateLocationRequestDto {
  @ApiProperty({
    description: 'Location name',
    example: 'Central Park',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    description: 'Location description',
    example: 'A large public park in New York City',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'Latitude coordinate',
    example: 40.785091,
    minimum: -90,
    maximum: 90,
  })
  @IsNumber()
  @Min(-90)
  @Max(90)
  latitude: number;

  @ApiProperty({
    description: 'Longitude coordinate',
    example: -73.968285,
    minimum: -180,
    maximum: 180,
  })
  @IsNumber()
  @Min(-180)
  @Max(180)
  longitude: number;

  @ApiProperty({
    description: 'URL of location image',
    example: 'https://example.com/image.jpg',
  })
  @IsUrl()
  @IsNotEmpty()
  imageUrl: string;
}


