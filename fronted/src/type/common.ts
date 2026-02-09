export type requestResponse<T> = {
  code: number;
  data: T;
  message: string;
};
export type requestResponseNoData = {
  code: number;
  message: string;
};
