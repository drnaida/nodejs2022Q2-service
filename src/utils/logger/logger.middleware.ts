import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { writeLog } from '../loggerRequest';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(LoggerMiddleware.name);

  use(req: Request, res: Response, next: NextFunction) {
    console.log('New log: ');
    const requestInfo = {
      url: req.baseUrl,
      query_parameters: req.query,
      body: req.body,
      statusCode: res.statusCode,
    };
    //writeLog(requestInfo);
    this.logger.log(requestInfo);
    next();
  }
}
