import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import { UpdateTrackDto } from './dto/update-track.dto';
import { FavoritesService } from '../favorites/favorites.service';
import {PrismaService} from "../prisma/prisma.service";
import {Track} from "./track.entity";

@Injectable()
export class TracksService {
  constructor(
    private readonly databaseService: InMemoryDatabaseService,
    private readonly favoritesService: FavoritesService,
    private readonly prismaService: PrismaService,
  ) {
  }

  async getAll(): Promise<Track[]> {
    return this.prismaService.track.findMany();
  }

  async getById(id: string): Promise<Track> {
    return await this.prismaService.track.findUnique({where: {id}});
  }

  async create(artistDto: CreateTrackDto): Promise<Track> {
    try {
      const data = {
        name: artistDto.name,
        duration: artistDto.duration,
        artistId: artistDto.artistId != null ? artistDto.artistId : undefined,
        albumId: artistDto.albumId != null ? artistDto.albumId : undefined,
      };
      return await this.prismaService.track.create({ data });
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  };

  async update(id: string, product: UpdateTrackDto): Promise<Track> {
    try {
      return await this.prismaService.track.update({
        where: {id},
        data: {...product},
      });
    } catch (err) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }

  }

  async remove(id: string): Promise<Track> {
    try {
      const deleted = await this.prismaService.track.delete({
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
