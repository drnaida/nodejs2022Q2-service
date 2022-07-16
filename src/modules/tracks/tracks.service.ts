import { Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import {UpdateTrackDto} from "./dto/update-track.dto";
import {FavoritesService} from "../favorites/favorites.service";
@Injectable()
export class TracksService {
  constructor(
      private readonly databaseService: InMemoryDatabaseService,
      private readonly favoritesService: FavoritesService
  ) {}

  getAll() {
    return this.databaseService.getAll('tracks');
  }

  getById(id: string) {
    return this.databaseService.getById(id, 'tracks');
  }

  create(artistDto: CreateTrackDto) {
    return this.databaseService.create(artistDto, 'tracks');
  }

  update(id: string, product: UpdateTrackDto) {
    return this.databaseService.update(id, product, 'tracks');
  }

  remove(id: string) {
    const deleted = this.databaseService.remove(id, 'tracks');
    const artist = this.favoritesService.getById(id, 'tracks');
    if (artist) {
      const something = this.favoritesService.removeFavorite(id, 'tracks');
    }
    return deleted;
  }
}
