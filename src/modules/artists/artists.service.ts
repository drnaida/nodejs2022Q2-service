import { Injectable } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
@Injectable()
export class ArtistsService {
  private artists = [];

  getAll() {
    return this.artists;
  }

  getById(id: string) {
    return this.artists.find((p) => p.id === id);
  }

  create(artistDto: CreateArtistDto) {
    return this.artists.push({
      ...artistDto,
      id: Date.now().toString(),
    });
  }

  update(id: string, product) {
    const index = this.artists.findIndex((p) => p.id === id);
    return (this.artists[index] = { id, ...product });
  }

  remove(id: string) {
    return (this.artists = this.artists.filter((p) => p.id != id));
  }
}
