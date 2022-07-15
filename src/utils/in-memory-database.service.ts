import { Injectable } from '@nestjs/common';
@Injectable()
export class InMemoryDatabaseService {
  private database = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
    favorites: [],
  };

  getAll(key) {
    return this.database[key];
  }

  getById(id: string, key) {
    return this.database[key].find((p) => p.id === id);
  }

  create(artistDto, key) {
    return this.database[key].push({
      ...artistDto,
      id: Date.now().toString(),
    });
  }

  update(id: string, product, key) {
    const index = this.database[key].findIndex((p) => p.id === id);
    return (this.database[key][index] = { id, ...product });
  }

  remove(id: string, key) {
    return (this.database[key] = this.database[key].filter((p) => p.id != id));
  }
}
