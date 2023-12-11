export interface GetListResponse<T> extends BasePageableModel {
  items: T[];
}

class BasePageableModel {
  index: number;
  size: number;
  count: number;
  pages: number;
  hasPrevious: boolean;
  hasNext: boolean;
}
