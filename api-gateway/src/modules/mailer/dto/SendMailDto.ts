import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { SEND_EMAIL } from 'src/shared/constants/model';

export class SendMailDto {
  @ApiProperty({ example: SEND_EMAIL.to, description: 'Recipient of the mail' })
  @IsEmail()
  to: string;

  @ApiProperty({
    example: SEND_EMAIL.subject,
    description: 'Subject of the mail',
  })
  @IsString()
  subject: string;

  @ApiProperty({
    example: SEND_EMAIL.templates,
    description: 'Handlebars template name',
  })
  @IsString()
  template: string;

  @ApiProperty({
    example: SEND_EMAIL.context,
    description: 'Dynamic context for the handlebars template',
  })
  context: Record<string, any>;
}
