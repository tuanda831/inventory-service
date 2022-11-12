import { LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  utilities as nestWinstonModuleUtilities,
  WinstonModule,
} from 'nest-winston';
import * as winston from 'winston';
import 'winston-daily-rotate-file';

export const LoggerFactory = (
  config: ConfigService,
  defaultLogger: LoggerService,
): LoggerService => {
  if (!config.get<boolean>('LOGGER__TO_FILE')) {
    return defaultLogger;
  }

  const baseConfig = {
    datePattern: config.get('LOGGER__FILE_DATE_PATTERN') || 'YYYY-MM-DD-HH',
    maxSize: config.get('LOGGER__FILE_MAX_SIZE') || '20m',
    maxFiles: config.get('LOGGER__FILE_MAX_FILES') || '14d',
    format: winston.format.combine(
      winston.format.timestamp(),
      winston.format.ms(),
      nestWinstonModuleUtilities.format.nestLike(
        config.get('LOGGER__TAG') || 'LOGGER__TAG',
        {},
      ),
    ),
  };

  return WinstonModule.createLogger({
    transports: [
      new winston.transports.DailyRotateFile({
        filename: `${config.get('LOGGER__FILE_PATH') || '%DATE%'}-info.log`,
        level: 'info',
        ...baseConfig,
      }),
      new winston.transports.DailyRotateFile({
        filename: `${config.get('LOGGER__FILE_PATH') || '%DATE%'}-error.log`,
        level: 'error',
        ...baseConfig,
      }),
      // other transports...
    ],
    // other options
  });
};
