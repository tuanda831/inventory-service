import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

export interface LoggerInterface {
  log: (...message: any[]) => void;
  error: (...data: any[]) => void;
}

@Injectable()
export class LoggerProvider implements LoggerInterface {
  private service: LoggerService;

  constructor() {
    this.service = WinstonModule.createLogger({
      transports: [
        new winston.transports.Console({
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.ms(),
            nestWinstonModuleUtilities.format.nestLike(
              process.env.LOGGER__TAG || 'LOGGER__TAG',
              {},
            ),
          ),
        }),
        // other transports...
      ],
      // other options
    });
  }

  log(...message: any[]) {
    this.service.log(message);
  }

  error(...data: any[]) {
    this.service.error(data);
  }
}
