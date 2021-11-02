export class TokenDataResponse {
  status: number;
  message: string;
  data: { userId: string } | null;
}
