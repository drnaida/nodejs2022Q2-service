import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import { UpdateAlbumDto } from './dto/update-album.dto';
import {FavoritesService} from "../favorites/favorites.service";
@Injectable()
export class AlbumsService {
  constructor(
      private readonly databaseService: InMemoryDatabaseService,
      private readonly favoritesService: FavoritesService
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
    const artist = this.favoritesService.getById(id, 'albums');
    const something = this.favoritesService.removeFavorite(id, 'albums');
    return deleted;
  }
}
