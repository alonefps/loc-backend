export class DomainException extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'DomainException';
  }
}

export class NotFoundException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'NotFoundException';
  }
}

export class ValidationException extends DomainException {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationException';
  }
}

