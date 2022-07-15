import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DataBaseModule } from '../../utils/in-memory-database.module';

@Module({
  providers: [AlbumsService],
  controllers: [AlbumsController],
  imports: [DataBaseModule],
})
export class AlbumsModule {}
