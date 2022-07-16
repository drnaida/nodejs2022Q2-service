import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import {UpdateArtistDto} from "./dto/update-product.dto";
import {FavoritesService} from "../favorites/favorites.service";
@Injectable()
export class ArtistsService {
  constructor(
      private readonly databaseService: InMemoryDatabaseService,
      private readonly favoritesService: FavoritesService
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
    if (artist) {
      this.favoritesService.removeFavorite(id, 'artists');
    }
    return deleted;
  }
}
