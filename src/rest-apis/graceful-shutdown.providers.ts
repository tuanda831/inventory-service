import { Inject, Injectable, OnApplicationShutdown } from '@nestjs/common';
import { LoggerProvider } from '../dal/logger/logger.providers';
import { DataSource } from 'typeorm';

@Injectable()
export class GracefullShutdown implements OnApplicationShutdown {
  @Inject(DataSource)
  private readonly dataSource: DataSource;

  @Inject(LoggerProvider)
  private readonly logger: LoggerProvider;

  onApplicationShutdown(signal: string) {
    this.logger.log(`Signal "${signal}" Received!`);
    this.dataSource.destroy();
  }
}
