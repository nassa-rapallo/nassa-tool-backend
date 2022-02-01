export type Response<Data> = {
  status: number;
  message: string;
  data: Data | null;
};
