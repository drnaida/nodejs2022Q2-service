import { Injectable } from '@nestjs/common';
import { CreateFavoriteDto } from './dto/create-favorite.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
@Injectable()
export class FavoritesService {
  constructor(private readonly databaseService: InMemoryDatabaseService) {}

  getAll() {
    return this.databaseService.getAll('favorites');
  }

  getById(id: string) {
    return this.databaseService.getById(id, 'favorites');
  }

  create(artistDto: CreateFavoriteDto) {
    return this.databaseService.create(artistDto, 'favorites');
  }

  remove(id: string) {
    return this.databaseService.remove(id, 'favorites');
  }
}
