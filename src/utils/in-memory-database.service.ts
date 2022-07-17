import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
@Injectable()
export class InMemoryDatabaseService {
  private database = {
    users: [],
    artists: [],
    tracks: [],
    albums: [],
    favorites: {
      artists: [],
      tracks: [],
      albums: [],
    },
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

  createFavorite(id, subkey) {
    this.database['favorites'][subkey].push({
      id: id,
    });
    return this.database['favorites'][subkey][
      this.database['favorites'][subkey].length - 1
    ];
  }
  update(id: string, product, key) {
    const index = this.database[key].findIndex((p) => p.id === id);
    const the_product = this.database[key][index];
    Object.assign(the_product, product);
    return the_product;
  }

  updatePassword(id: string, product, key) {
    const index = this.database[key].findIndex((p) => p.id === id);
    const the_product = this.database[key][index];
    if (the_product.password == product.oldPassword) {
      the_product.password = product.newPassword;
      return the_product;
    } else {
      throw new HttpException(
        'Wrong previous/old password',
        HttpStatus.FORBIDDEN,
      );
    }
  }

  remove(id: string, key) {
    return (this.database[key] = this.database[key].filter((p) => p.id != id));
  }
  removeFavorite(the_id: string, subkey) {
    const entityIdx = this.database.favorites[subkey].findIndex((item) => item.id === the_id);

    console.log('entity', entityIdx);

    return this.database.favorites[subkey].splice(entityIdx, 1);
  }
}