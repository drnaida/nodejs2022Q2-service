import { forwardRef, Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { DataBaseModule } from '../../utils/in-memory-database.module';
import { FavoritesModule } from '../favorites/favorites.module';

@Module({
  providers: [TracksService],
  controllers: [TracksController],
  imports: [DataBaseModule, forwardRef(() => FavoritesModule)],
  exports: [TracksService],
})
export class TracksModule {}
