import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import {UpdateArtistDto} from "./dto/update-product.dto";
import {FavoritesService} from "../favorites/favorites.service";
import {AlbumsService} from "../albums/albums.service";
@Injectable()
export class ArtistsService {
  constructor(
      private readonly databaseService: InMemoryDatabaseService,
      private readonly favoritesService: FavoritesService,
      private readonly albumsService: AlbumsService
  ) {}

  getAll() {
    return this.databaseService.getAll('artists');
  }

  getById(id: string) {
    return this.databaseService.getById(id, 'artists');
  }

  create(artistDto: CreateArtistDto) {
    return this.databaseService.create(artistDto, 'artists');
  }

  update(id: string, product: UpdateArtistDto) {
    return this.databaseService.update(id, product, 'artists');
  }

  remove(id: string) {
    const deleted = this.databaseService.remove(id, 'artists');
    const artist = this.favoritesService.getById(id, 'artists');
    const something = this.favoritesService.removeFavorite(id, 'artists');
    const allAlbums = this.albumsService.getAll();
    if (allAlbums.length > 0) {
      allAlbums.forEach((album) => {
        if (album.artistId == id) {
          const new_album = album;
          new_album.artistId = null;
          console.log('new_album', new_album);
          this.albumsService.update(
              album.id,
              new_album
          );
        }
      })
      }
    return deleted;
  }
}
