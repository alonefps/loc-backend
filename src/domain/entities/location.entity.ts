export class Location {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly description: string,
    public readonly latitude: number,
    public readonly longitude: number,
    public readonly imageUrl: string,
    public readonly createdAt: Date,
    public readonly updatedAt: Date,
  ) {
    this.validate();
  }

  private validate(): void {
    if (!this.name || this.name.trim().length === 0) {
      throw new Error('Location name cannot be empty');
    }

    if (!this.description || this.description.trim().length === 0) {
      throw new Error('Location description cannot be empty');
    }

    if (this.latitude < -90 || this.latitude > 90) {
      throw new Error('Latitude must be between -90 and 90');
    }

    if (this.longitude < -180 || this.longitude > 180) {
      throw new Error('Longitude must be between -180 and 180');
    }

    if (!this.imageUrl || !this.isValidUrl(this.imageUrl)) {
      throw new Error('Invalid image URL');
    }
  }

  private isValidUrl(url: string): boolean {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  }

  public update(
    name?: string,
    description?: string,
    latitude?: number,
    longitude?: number,
    imageUrl?: string,
  ): Location {
    return new Location(
      this.id,
      name ?? this.name,
      description ?? this.description,
      latitude ?? this.latitude,
      longitude ?? this.longitude,
      imageUrl ?? this.imageUrl,
      this.createdAt,
      new Date(),
    );
  }

  public toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      latitude: this.latitude,
      longitude: this.longitude,
      imageUrl: this.imageUrl,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }
}


