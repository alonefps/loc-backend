import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { CreateLocationUseCase } from '@application/use-cases/create-location.use-case';
import { GetLocationByIdUseCase } from '@application/use-cases/get-location-by-id.use-case';
import { ListLocationsUseCase } from '@application/use-cases/list-locations.use-case';
import { UpdateLocationUseCase } from '@application/use-cases/update-location.use-case';
import { DeleteLocationUseCase } from '@application/use-cases/delete-location.use-case';
import { CreateLocationRequestDto } from '../dtos/create-location-request.dto';
import { UpdateLocationRequestDto } from '../dtos/update-location-request.dto';
import { LocationResponseDto } from '../dtos/location-response.dto';

@ApiTags('locations')
@Controller('locations')
export class LocationsController {
  constructor(
    private readonly createLocationUseCase: CreateLocationUseCase,
    private readonly getLocationByIdUseCase: GetLocationByIdUseCase,
    private readonly listLocationsUseCase: ListLocationsUseCase,
    private readonly updateLocationUseCase: UpdateLocationUseCase,
    private readonly deleteLocationUseCase: DeleteLocationUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create a new location' })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Location created successfully',
    type: LocationResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  async create(@Body() dto: CreateLocationRequestDto): Promise<LocationResponseDto> {
    try {
      const location = await this.createLocationUseCase.execute({
        name: dto.name,
        description: dto.description,
        latitude: dto.latitude,
        longitude: dto.longitude,
        imageUrl: dto.imageUrl,
      });
      return location.toJSON();
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  @Get()
  @ApiOperation({ summary: 'List all locations' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of all locations',
    type: [LocationResponseDto],
  })
  async findAll(): Promise<LocationResponseDto[]> {
    const locations = await this.listLocationsUseCase.execute();
    return locations.map((location) => location.toJSON());
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a location by ID' })
  @ApiParam({ name: 'id', description: 'Location ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Location found',
    type: LocationResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Location not found',
  })
  async findOne(@Param('id') id: string): Promise<LocationResponseDto> {
    const location = await this.getLocationByIdUseCase.execute(id);
    if (!location) {
      throw new NotFoundException('Location not found');
    }
    return location.toJSON();
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update a location' })
  @ApiParam({ name: 'id', description: 'Location ID' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Location updated successfully',
    type: LocationResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Location not found',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid data provided',
  })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateLocationRequestDto,
  ): Promise<LocationResponseDto> {
    try {
      const location = await this.updateLocationUseCase.execute(id, {
        name: dto.name,
        description: dto.description,
        latitude: dto.latitude,
        longitude: dto.longitude,
        imageUrl: dto.imageUrl,
      });
      return location.toJSON();
    } catch (error) {
      if (error.message === 'Location not found') {
        throw new NotFoundException(error.message);
      }
      throw new BadRequestException(error.message);
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete a location' })
  @ApiParam({ name: 'id', description: 'Location ID' })
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Location deleted successfully',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Location not found',
  })
  async remove(@Param('id') id: string): Promise<void> {
    try {
      await this.deleteLocationUseCase.execute(id);
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }
}

