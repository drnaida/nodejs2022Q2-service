import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        console.log('Prisma construztor');
        super();
    }
    async onModuleInit() {
        console.log('Module init?');
        await this.$connect();
    }
}
