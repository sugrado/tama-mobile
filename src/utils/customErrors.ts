export class BusinessError extends Error {
  title: string;
  constructor(message: string) {
    super(message);
    this.title = 'Rule violation';
  }
}

export class AuthorizationError extends Error {
  title: string;
  constructor(message: string) {
    super(message);
    this.title = 'Authorization error';
  }
}

export class InternalServerError extends Error {
  title: string;
  constructor(message: string) {
    super(message);
    this.title = 'Internal server error';
  }
}

export class NotFoundError extends Error {
  title: string;
  constructor(message: string) {
    super(message);
    this.title = 'Not found';
  }
}

export class ValidationError extends Error {
  title: string;
  constructor(message: string) {
    super(message);
    this.title = 'Validation error(s)';
  }
}

export class RequestError extends Error {
  title: string;
  constructor(message: string) {
    super(message);
    this.title = 'Request error';
  }
}

export type CustomError =
  | BusinessError
  | AuthorizationError
  | InternalServerError
  | NotFoundError
  | ValidationError
  | RequestError;

export const isCritical = (error: CustomError) =>
  error instanceof InternalServerError ||
  error instanceof AuthorizationError ||
  error instanceof RequestError;
