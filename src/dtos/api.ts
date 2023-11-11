import {CustomError} from '../utils/customErrors';

export class ApiErrorResponse {
  error: CustomError | null;
}

export class ApiDataResponse<T> extends ApiErrorResponse {
  data: T | null;
}
