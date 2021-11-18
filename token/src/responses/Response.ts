export type Response<Data> = {
  status: number;
  message: string;
  errors?: string[];
  data: Data | null;
};
