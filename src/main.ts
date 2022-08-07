import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule } from '@nestjs/swagger';
import { dirname, join } from 'path';
import { parse } from 'yaml';
import 'dotenv/config';
import { readFile } from 'fs/promises';
import {ApplicationLogger} from "./utils/logger/logger.service";
import {prepareLoggerVariables} from "./utils/loggerRequest";

async function bootstrap() {
  console.log(AppModule);
  const app = await NestFactory.create(AppModule, {
    logger: new ApplicationLogger(prepareLoggerVariables()),
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  const docs = await readFile(
    join(dirname(__dirname), 'doc', 'api.yaml'),
    'utf-8',
  );
  const parse_yaml = parse(docs);

  SwaggerModule.setup('doc', app, parse_yaml);
  await app.listen(process.env.PORT || 4000);
}
bootstrap();
