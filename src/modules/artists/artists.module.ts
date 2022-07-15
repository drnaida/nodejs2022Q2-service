import { Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DataBaseModule } from '../../utils/in-memory-database.module';

@Module({
  providers: [ArtistsService],
  controllers: [ArtistsController],
  imports: [DataBaseModule],
})
export class ArtistsModule {}
