export interface BaseResponse<T> {
  data: T
  exception: object;
  success: true;
  requestDate: string;
  responseDate: string;
}
