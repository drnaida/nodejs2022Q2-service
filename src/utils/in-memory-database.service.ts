import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
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
    this.database[key].push({
      ...artistDto,
      id: uuidv4(),
    });
    return this.database[key][this.database[key].length - 1];
  }

  update(id: string, product, key) {
    const index = this.database[key].findIndex((p) => p.id === id);
    const original = this.database[key][index];
    return (this.database[key][index] = { id, ...original, ...product });
  }

  remove(id: string, key) {
    return (this.database[key] = this.database[key].filter((p) => p.id != id));
  }
}
