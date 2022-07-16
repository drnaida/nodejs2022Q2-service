import { Module, forwardRef } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DataBaseModule } from '../../utils/in-memory-database.module';
import {ArtistsModule} from "../artists/artists.module";
import {AlbumsModule} from "../albums/albums.module";
import {TracksModule} from "../tracks/tracks.module";

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [
      DataBaseModule,
      forwardRef(() => TracksModule),
      forwardRef(() => ArtistsModule),
      forwardRef(() => AlbumsModule),
  ],
  exports: [FavoritesService]
})
export class FavoritesModule {}
