import { Injectable } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
@Injectable()
export class AlbumsService {
  constructor(
    private readonly databaseService: InMemoryDatabaseService,
    private readonly favoritesService: FavoritesService,
    private readonly tracksService: TracksService,
  ) {}

  getAll() {
    return this.databaseService.getAll('albums');
  }

  getById(id: string) {
    return this.databaseService.getById(id, 'albums');
  }

  create(artistDto: CreateAlbumDto) {
    return this.databaseService.create(artistDto, 'albums');
  }

  update(id: string, product: UpdateAlbumDto) {
    return this.databaseService.update(id, product, 'albums');
  }

  remove(id: string) {
    const deleted = this.databaseService.remove(id, 'albums');
    this.favoritesService.getById(id, 'albums');
    this.favoritesService.removeFavorite(id, 'albums');
    const allTracks = this.tracksService.getAll();
    if (allTracks.length > 0) {
      allTracks.forEach((track) => {
        if (track.albumId == id) {
          const new_album = track;
          new_album.albumId = null;
          console.log('new_album', new_album);
          this.tracksService.update(track.id, new_album);
        }
      });
    }
    return deleted;
  }
}
