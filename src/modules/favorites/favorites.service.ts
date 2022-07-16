import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
@Injectable()
export class FavoritesService {
  constructor(private readonly databaseService: InMemoryDatabaseService) {}

  getAll() {
    const favorites = this.databaseService.getAll('favorites');
    console.log('sdfs', favorites);
    for (const element in favorites) {
      if (element.length > 0) {
        if (element == 'artists') {
          const result = favorites['artists'].map((item) =>
            this.databaseService.getById(item.id, 'artists'),
          );
          favorites.artists = result;
        } else if (element == 'albums') {
          const result = favorites['albums'].map((item) =>
            this.databaseService.getById(item.id, 'albums'),
          );
          favorites.albums = result;
        } else if (element == 'tracks') {
          const result = favorites['tracks'].map((item) =>
            this.databaseService.getById(item.id, 'tracks'),
          );
          favorites.tracks = result;
        }
      }
    }
    return favorites;
  }

  getById(id: string, subkey) {
    let result;
    if (subkey == 'artists') {
      result = this.databaseService.getById(id, 'artists');
    } else if (subkey == 'albums') {
      result = this.databaseService.getById(id, 'albums');
    } else if (subkey == 'tracks') {
      result = this.databaseService.getById(id, 'tracks');
    }
    return result;
  }

  create(id: string) {
    return this.databaseService.create(id, 'favorites');
  }

  createFavorite(id: string, subkey) {
    const favorite = this.databaseService.createFavorite(id, subkey);
    const result = this.databaseService.getById(id, subkey);
    console.log('createResult', result);
    return result;
  }

  remove(id: string) {
    return this.databaseService.remove(id, 'favorites');
  }
  removeFavorite(id: string, subkey) {
    return this.databaseService.removeFavorite(id, subkey);
  }
}
