import { Module } from '@nestjs/common';
import { ConfigService } from './services/config/config.service';

import Providers from 'src/providers';
import Controllers from 'src/routes';
import Guards from 'src/services/guards';
import Services from 'src/services/clients';

@Module({
  imports: [],
  controllers: [...Controllers],
  providers: [ConfigService, ...Services, ...Providers, ...Guards],
})
export class AppModule {}
