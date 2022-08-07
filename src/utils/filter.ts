import {
    Catch,
    ArgumentsHost,
    ExceptionFilter,
    HttpException,
    HttpStatus,
    Logger,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import {prepareStringForLog, writeLog} from "./loggerRequest";
import {ErrorResponse} from "./logsEnum";

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
    private readonly logger: Logger = new Logger(AllExceptionsFilter.name);

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx: HttpArgumentsHost = host.switchToHttp();
        const response = ctx.getResponse<Response>();
        const request = ctx.getRequest<Request>();
        let status: HttpStatus;
        let errorMessage: string;

        if (exception instanceof HttpException) {
            status = exception.getStatus();
            const errorResponse: any = exception.getResponse();
            errorMessage = errorResponse.error || exception.message;
        } else {
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            errorMessage = 'Internal server error';
        }

        const errorResponse = this.getErrorResponse(status, errorMessage, request);
        const errorLog = this.getErrorLog(errorResponse, request, exception);
        this.logger.error(errorLog);
        this.writeErrorLogToFile(errorLog);
        response.status(status).json(errorResponse);
    }

    private getErrorResponse = (
        status: HttpStatus,
        errorMessage: string,
        request: Request,
    ) => ({
        statusCode: status,
        error: errorMessage,
        path: request.url,
        method: request.method,
        timeStamp: new Date(),
    });

    private getErrorLog = (
        errorResponse: ErrorResponse,
        request: Request,
        exception: unknown,
    ): string => {
        return prepareStringForLog(errorResponse, request, exception);
    };

    private writeErrorLogToFile = (errorLog: string): void => {
        writeLog(errorLog);
    };
}