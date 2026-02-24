export type requestResponse<T> = {
  code: number;
  data: T;
  message: string;
};
export type requestResponseNoData = {
  code: number;
  message: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type optionType = { [key: string]: any };
