export interface TokenDestroyResponse {
  status: number;
  message: string;
  errors: { [key: string]: any } | null;
}
