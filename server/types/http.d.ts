export interface HttpSuccess<T> {
  error: false;
  data: T;
}

export interface HttpFailed {
  error: true;
  code: number;
  message: string;
}
