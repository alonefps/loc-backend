export interface CreateLocationDto {
  name: string;
  description: string;
  latitude: number;
  longitude: number;
  imageUrl: string;
}

export interface UpdateLocationDto {
  name?: string;
  description?: string;
  latitude?: number;
  longitude?: number;
  imageUrl?: string;
}


