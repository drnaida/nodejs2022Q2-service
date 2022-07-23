import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import {PrismaService} from "../prisma/prisma.service";
import {Album} from "@prisma/client";
import {CreateAlbumDto} from "../albums/dto/create-albumdto";
import {UpdateAlbumDto} from "../albums/dto/update-product.dto";
@Injectable()
export class AlbumsService {
  constructor(
    private readonly databaseService: InMemoryDatabaseService,
    private readonly favoritesService: FavoritesService,
    private readonly tracksService: TracksService,
    private readonly prismaService: PrismaService,
  ) {
  }

  async getAll(): Promise<Album[]> {
    return this.prismaService.album.findMany();
  }

  async getById(id: string): Promise<Album> {
    return await this.prismaService.album.findUnique({where: {id}});
  }

  async create(artistDto: CreateAlbumDto): Promise<Album> {
    return await this.prismaService.album.create({
      data: artistDto,
    });
  };

  async update(id: string, product: UpdateAlbumDto): Promise<Album> {
    try {
      return await this.prismaService.album.update({
        where: {id},
        data: {...product},
      });
    } catch (err) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

  }

  async remove(id: string): Promise<Album> {
    try {
      const deleted = await this.prismaService.album.delete({
        where: {
          id: id,
        },
      })
      return deleted;
    } catch (err) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}