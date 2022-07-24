import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import { UpdateArtistDto } from './dto/update-product.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { PrismaService } from "../prisma/prisma.service";
import { Artist } from '@prisma/client';
@Injectable()
export class ArtistsService {
  constructor(
      private readonly databaseService: InMemoryDatabaseService,
      private readonly favoritesService: FavoritesService,
      private readonly albumsService: AlbumsService,
      private readonly tracksService: TracksService,
      private readonly prismaService: PrismaService,
  ) {
  }

  async getAll(): Promise<Artist[]> {
    return this.prismaService.artist.findMany();
  }

  async getById(id: string): Promise<Artist> {
    return await this.prismaService.artist.findUnique({where: {id}});
  }

  async create(artistDto: CreateArtistDto): Promise<Artist> {
    return await this.prismaService.artist.create({
      data: artistDto,
    });
  };

  async update(id: string, product: UpdateArtistDto): Promise<Artist> {
    try {
      return await this.prismaService.artist.update({
        where: {id},
        data: {...product},
      });
    } catch (err) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }

  }

  async remove(id: string): Promise<Artist> {
    try {
      const deleted = await this.prismaService.artist.delete({
        where: {
          id: id,
        },
      })
      return deleted;
    } catch (err) {
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }
}