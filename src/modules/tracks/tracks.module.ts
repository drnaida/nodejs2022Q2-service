import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DataBaseModule } from '../../utils/in-memory-database.module';

@Module({
  providers: [TracksService],
  controllers: [TracksController],
  imports: [DataBaseModule],
  exports: [TracksService]
})
export class TracksModule {}
