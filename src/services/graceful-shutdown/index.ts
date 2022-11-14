import {
  Inject,
  Injectable,
  Logger,
  OnApplicationShutdown,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { DataSource } from 'typeorm';

@Injectable()
export class GracefulShutdown implements OnApplicationShutdown {
  @Inject(DataSource)
  private readonly dataSource: DataSource;

  @Inject(ClientKafka)
  private readonly eventClient: ClientKafka;

  onApplicationShutdown(signal: string) {
    Logger.log(`Signal "${signal}" Received!`);
    this.dataSource.destroy();
    this.eventClient.close();
  }
}
