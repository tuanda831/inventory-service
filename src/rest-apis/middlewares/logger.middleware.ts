import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const requestStart = Date.now();

    res.on('finish', () => {
      const { rawHeaders, httpVersion, method, socket, url } = req;
      const { remoteAddress, remoteFamily } = socket;

      Logger.log(
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
