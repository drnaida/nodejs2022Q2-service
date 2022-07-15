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

try {
  if (checkThatThisIsUUID4(id)) {
    const product = await database.getById(id);
    if (!product) {
      res.writeHead(404, {'Content-Type': 'application/json'});
      res.write(JSON.stringify({message: 'User not found'}));
      res.end();
    } else {
      res.writeHead(200, {'Content-Type': 'application/json'});
      res.write(JSON.stringify(product));
      res.end();
    }
  } else {
    res.writeHead(400, {'Content-Type': 'application/json'});
    res.write(JSON.stringify({message: 'Not an uuid'}));
    res.end();
  }

} catch (error) {
  res.writeHead(500, {'Content-Type': 'application/json'});
  res.write(JSON.stringify({message: 'Errors on the server side that occur during the processing of a request'}));
  res.end();
}
}