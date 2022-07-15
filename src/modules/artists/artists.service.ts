import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
@Injectable()
export class ArtistsService {
  constructor(private readonly databaseService: InMemoryDatabaseService) {}

  getAll() {
    return this.databaseService.getAll('artists');
  }

  getById(id: string) {
    return this.databaseService.getById(id, 'artists');
  }

  create(artistDto: CreateArtistDto) {
    return this.databaseService.create(artistDto, 'artists');
  }

  update(id: string, product) {
    return this.databaseService.update(id, product, 'artists');
  }

  remove(id: string) {
    return this.databaseService.remove(id, 'artists');
  }
}
