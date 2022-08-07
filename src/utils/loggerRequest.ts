import { HttpException } from '@nestjs/common';
import * as fs from 'fs';
import {ErrorResponse, Logs} from "./logsEnum";
import e from 'express';

export const prepareStringForLog = (
    errorResponse: ErrorResponse,
    request: e.Request,
    exception: unknown,
): string => {
    const { method, url }: { method: string; url: string } = request;

    return `Response Code: ${
        errorResponse.statusCode
    } - Method: ${method} - URL: ${url}\n
    ${
        exception instanceof HttpException ? exception.stack : errorResponse.error
    }\n`;
};

export const writeLog = (errorLog: string) => {
    const logsFolder: string = process.env.LOGGER_FOLDER;
    const logFileSize = Number(process.env.LOGGER_FILE_SIZE);
    fs.readdir(logsFolder, (err: NodeJS.ErrnoException, files: string[]) => {
        console.log(files);
        if (err) {
            const fullPath: string = createNewLogsPath(logsFolder);
            createFolder(logsFolder);
            writeLogInFile(fullPath, errorLog);
        }
        (files || []).forEach((file: string) => {
            const fileSize: number = checkLogFileSize(`${logsFolder}/${file}`);

            if (fileSize < logFileSize) {
                writeLogInFile(`${logsFolder}/${file}`, errorLog);
            } else {
                const fullPath: string = createNewLogsPath(logsFolder);
                writeLogInFile(fullPath, errorLog);
            }
        });
    });
};

export const createNewLogsPath = (logsFolder: string): string => {
    const logFileName: number = new Date().valueOf();
    return `${logsFolder}/${logFileName}.log`;
};

export const writeLogInFile = (logName: string, errorLog: string) => {
    console.log('sdfdsfdsfdsfdss');
    fs.appendFile(logName, errorLog, 'utf8', (err: NodeJS.ErrnoException) => {
        if (err) throw err;
    });
};

export const createFolder = (logsFolder: string): void => {
    fs.mkdir(logsFolder, { recursive: true }, (err: NodeJS.ErrnoException) => {
        if (err) throw err;
    });
};

export const checkLogFileSize = (fileName: string): number => {
    try {
        const stats: fs.Stats = fs.statSync(fileName);
        return stats.size;
    } catch (e) {
        console.log('File not found');
    }
};

export const prepareLoggerVariables = (): string[] => {
    const logVariables = [];
    const logs = Array(Number(process.env.LOGGER_LEVEL)).fill('_');

    logs.forEach((_, index: number): void => {
        logVariables.push(Logs[index]);
    });

    return logVariables;
};

export const addException = (): void => {
    process
        .on('unhandledRejection', () => {
            process.stdout.write('Unhandled Rejection at Promise');
        })
        .on('uncaughtException', () => {
            process.stdout.write('Uncaught Exception thrown');
            process.exit(1);
        });
};