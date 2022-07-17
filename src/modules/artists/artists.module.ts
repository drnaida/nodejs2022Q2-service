import {forwardRef, Module} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
import { DataBaseModule } from '../../utils/in-memory-database.module';
import {FavoritesModule} from "../favorites/favorites.module";
import {AlbumsModule} from "../albums/albums.module";
import {TracksModule} from "../tracks/tracks.module";

@Module({
  providers: [ArtistsService],
  controllers: [ArtistsController],
  imports: [DataBaseModule,
    forwardRef(() => FavoritesModule),
    AlbumsModule,
    TracksModule
  ],
  exports: [ArtistsService]
})
export class ArtistsModule {}
