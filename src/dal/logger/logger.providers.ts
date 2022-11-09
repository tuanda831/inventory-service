import { Injectable, LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
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
        new winston.transports.DailyRotateFile({
          filename: `${process.env.LOGGER__FILE_PATH || '%DATE%'}-info.log`,
          level: 'info',
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
        }),
        new winston.transports.DailyRotateFile({
          filename: `${process.env.LOGGER__FILE_PATH || '%DATE%'}-error.log`,
          level: 'error',
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
