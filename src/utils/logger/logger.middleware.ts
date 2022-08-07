import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    private readonly logger: Logger = new Logger(LoggerMiddleware.name);

    use(req: Request, res: Response, next: NextFunction) {
        function RequestInfo(url, queryParameters, body, statusCode) {
            this.url = url;
            this.query_parameters = queryParameters;
            this.body = body;
            this.statusCode = statusCode;
        }

        const requestInfo = new RequestInfo(
            req.url,
            req.query,
            req.body,
            res.statusCode,
        );

        console.table(requestInfo);
        this.logger.log(requestInfo);
        next();
    }
}