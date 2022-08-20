import { HttpStatus } from '@nestjs/common';

export type ErrorResponse = {
    statusCode: HttpStatus;
    error: string;
    url: string;
    method: string;
};

export enum Logs {
    debug = 0,
    verbose = 1,
    log = 2,
    warn = 3,
    error = 4,
}