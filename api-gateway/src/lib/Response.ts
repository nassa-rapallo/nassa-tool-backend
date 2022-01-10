export type Response<Data> = {
  status?: number;
  statusCode?: number;
  message: string;
  errors?: string[];
  data: Data | null;
};
