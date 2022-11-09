import {
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class GracefullShutdown implements OnApplicationShutdown {
  @Inject(DataSource)
  private readonly dataSource: DataSource;

  onApplicationShutdown(signal: string) {
    Logger.log(`Signal "${signal}" Received!`);
    this.dataSource.destroy();
  }
}
