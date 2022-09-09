import {
  Catch,
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { prepareStringForLog, writeLog } from './loggerRequest';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(AllExceptionsFilter.name);

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const request = ctx.getRequest();

    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    const errorMessage =
      exception instanceof HttpException ? exception.message : 'Internal error';

    const errorLog = prepareStringForLog(
      {
        statusCode: status,
        error: errorMessage,
        url: request.url,
        method: request.method,
      },
      request,
      exception,
    );
    this.logger.error(errorLog);
    writeLog(errorLog);
    ctx.getResponse().status(status).json({
      statusCode: status,
      error: errorMessage,
      url: request.url,
      method: request.method,
    });
  }
}
