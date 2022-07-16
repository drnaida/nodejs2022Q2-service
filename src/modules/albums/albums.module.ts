import { Module, forwardRef } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { DataBaseModule } from '../../utils/in-memory-database.module';
import {FavoritesModule} from "../favorites/favorites.module";

@Module({
  providers: [AlbumsService],
  controllers: [AlbumsController],
  imports: [DataBaseModule,
    forwardRef(() => FavoritesModule),
  ],
  exports: [AlbumsService]
})
export class AlbumsModule {}
