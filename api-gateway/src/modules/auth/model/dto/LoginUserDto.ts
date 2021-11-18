import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({ example: 'prova@nassa-tool.it' })
  email: string;

  @ApiProperty({ example: 'prova11' })
  password: string;
}
