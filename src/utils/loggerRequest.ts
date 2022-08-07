import { HttpException } from '@nestjs/common';
import * as fs from 'fs';
import { ErrorResponse, Logs } from './logsEnum';
import e from 'express';

export const prepareStringForLog = (
  errorResponse: ErrorResponse,
  request: e.Request,
  exception: unknown,
) => {
  const { method, url }: { method: string; url: string } = request;

  return `Status: ${
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
    if (err) {
      const logFileName: number = new Date().valueOf();
      const fullPath = `${logsFolder}/${logFileName}.log`;
      fs.mkdir(
        logsFolder,
        { recursive: true },
        (err: NodeJS.ErrnoException) => {
          if (err) throw err;
          fs.appendFile(
            fullPath,
            errorLog,
            'utf8',
            (err: NodeJS.ErrnoException) => {
              if (err) throw err;
            },
          );
        },
      );
    }
    (files || []).forEach((file: string) => {
      const stats: fs.Stats = fs.statSync(`${logsFolder}/${file}`);
      const fileSize: number = stats.size;

      if (fileSize < logFileSize) {
        fs.appendFile(
          `${logsFolder}/${file}`,
          errorLog,
          'utf8',
          (err: NodeJS.ErrnoException) => {
            if (err) throw err;
          },
        );
      } else {
        const logFileName: number = new Date().valueOf();
        const fullPath = `${logsFolder}/${logFileName}.log`;
        fs.appendFile(
          fullPath,
          errorLog,
          'utf8',
          (err: NodeJS.ErrnoException) => {
            if (err) throw err;
          },
        );
      }
    });
  });
};

export const prepareLoggerVariables = (): string[] => {
  const logVariables = [];
  const logs = Array(Number(process.env.LOGGER_LEVEL)).fill('_');

  logs.forEach((_, index: number) => {
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
