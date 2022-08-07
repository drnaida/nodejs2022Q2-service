import { LoggerService } from '@nestjs/common';
import {writeLog} from "../loggerRequest";

export class ApplicationLogger implements LoggerService {
  private logs;

  constructor(arg: string[]) {
    this.logs = arg;
  }

  log(message: any, ...optionalParams: any[]) {
    if (this.logs.includes('log')) {
      console.log(message, optionalParams);
    }
  }

  error(message: any, ...optionalParams: any[]): any {
    if (this.logs.includes('error')) {
      console.log(message, optionalParams);
    }
  }

  warn(message: any, ...optionalParams: any[]): any {
    if (this.logs.includes('warn')) {
      console.log(message, optionalParams);
    }
  }

  debug?(message: any, ...optionalParams: any[]) {
    if (this.logs.includes('debug')) {
      console.log(message, optionalParams);
    }
  }

  verbose?(message: any, ...optionalParams: any[]) {
    if (this.logs.includes('verbose')) {
      console.log(message, optionalParams);
    }
  }
}