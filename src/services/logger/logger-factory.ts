import { LoggerService } from '@nestjs/common';
import * as winston from 'winston';
import 'winston-daily-rotate-file';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';

export const LoggerFactory = (defaultLogger: LoggerService): LoggerService => {
  if (process.env.LOGGER__TO_FILE == 'false') {
    return defaultLogger;
  }

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

  return WinstonModule.createLogger({
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
};
