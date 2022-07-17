import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './modules/artists/artists.module';
import { DataBaseModule } from './utils/in-memory-database.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { UsersModule } from './modules/users/users.module';
import { FavoritesModule } from './modules/favorites/favorites.module';

@Module({
  imports: [
    ArtistsModule,
    TracksModule,
    UsersModule,
    AlbumsModule,
    DataBaseModule,
    UsersModule,
    FavoritesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
