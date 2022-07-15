import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { DataBaseModule } from '../../utils/in-memory-database.module';

@Module({
  providers: [UsersService],
  controllers: [UsersController],
  imports: [DataBaseModule],
})
export class UsersModule {}
