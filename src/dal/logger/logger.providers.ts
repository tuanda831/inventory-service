import { ConsoleLogger, Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

@Injectable()
export class LoggerProvider extends ConsoleLogger {
  private service: LoggerService;

  constructor() {
    super();

    const baseConfig = {
      datePattern: process.env.LOGGER__FILE_DATE_PATTERN || 'YYYY-MM-DD-HH',
      maxSize: process.env.LOGGER__FILE_MAX_SIZE || '20m',
      maxFiles: process.env.LOGGER__FILE_MAX_FILES || '14d',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.ms(),
        nestWinstonModuleUtilities.format.nestLike(
          process.env.LOGGER__TAG || 'LOGGER__TAG',
          {},
        ),
      ),
    };

    this.service = WinstonModule.createLogger({
      transports: [
        new winston.transports.DailyRotateFile({
          filename: `${process.env.LOGGER__FILE_PATH || '%DATE%'}-info.log`,
          level: 'info',
          ...baseConfig,
        }),
        new winston.transports.DailyRotateFile({
          filename: `${process.env.LOGGER__FILE_PATH || '%DATE%'}-error.log`,
          level: 'error',
          ...baseConfig,
        }),
        // other transports...
      ],
      // other options
    });
  }

  warn(message: any, ...optionalParams: any[]) {
    super.warn(message, ...optionalParams);
    this.service.warn(message, ...optionalParams);
  }

  log(message: any, ...optionalParams: any[]) {
    super.log(message, ...optionalParams);
    this.service.log(message, ...optionalParams);
  }

  error(message: any, ...optionalParams: any[]) {
    super.error(message, ...optionalParams);
    this.service.error(message, ...optionalParams);
  }
}
