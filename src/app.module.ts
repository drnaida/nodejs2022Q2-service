import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './modules/artists/artists.controller';
import { ArtistsService } from './modules/artists/artists.service';
import { ArtistsModule } from './modules/artists/artists.module';
import { DataBaseModule } from './utils/in-memory-database.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { UsersModule } from './modules/users/users.module';

@Module({
  imports: [
    ArtistsModule,
    TracksModule,
    UsersModule,
    AlbumsModule,
    DataBaseModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
