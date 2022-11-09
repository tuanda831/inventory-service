import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { LoggerProvider } from '../../dal/logger/logger.providers';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private logger: LoggerProvider) {}
  use(req: Request, res: Response, next: NextFunction) {
    const requestStart = Date.now();

    res.on('finish', () => {
      const { rawHeaders, httpVersion, method, socket, url } = req;
      const { remoteAddress, remoteFamily } = socket;

      this.logger.log(
        JSON.stringify({
          timestamp: Date.now(),
          processingTime: `${Date.now() - requestStart}ms`,
          rawHeaders,
          body: req.body,
          httpVersion,
          method,
          remoteAddress,
          remoteFamily,
          url,
          responseCode: res.statusCode,
        }),
      );
    });

    next();
  }
}
