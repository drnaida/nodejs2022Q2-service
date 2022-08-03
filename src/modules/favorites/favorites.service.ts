import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import { PrismaService } from '../prisma/prisma.service';
import { Track } from '../tracks/track.entity';
import { CreateTrackDto } from '../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../tracks/dto/update-track.dto';
@Injectable()
export class FavoritesService {
  constructor(
    private readonly databaseService: InMemoryDatabaseService,
    private readonly prismaService: PrismaService,
  ) {}

  async getAll(): Promise<any> {
    const getAllArtists = await this.prismaService.artistsFavorites.findMany({
      include: {
        artist: {}
      }
    });
    const showArtistsInRightWay = getAllArtists.map((a) => {
      return a.artist;
    });
    const getAllTracks = [];
    const showTracksInRightWay = getAllTracks.map((a) => {
      return a.track;
    });
    const getAllAlbums = [];
    const showAlbumsInRightWay = getAllAlbums.map((a) => {
      return a.album;
    });

    return {
      artists: showArtistsInRightWay,
      albums: showAlbumsInRightWay,
      tracks: showTracksInRightWay,
    };
  }

  async createArtist(id: string): Promise<any> {
    try {
      const artist = await this.prismaService.artist.findUnique({
        where: { id },
      });
      if (artist) {
        const createdArtist = await this.prismaService.artistsFavorites.create({
          data: { artistId: id },
        });
        console.log('lalala', createdArtist);
        return createdArtist;
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async removeArtist(id: string): Promise<any> {
    try {
      const deleted = await this.prismaService.artistsFavorites.delete({
        where: {
          artistId: id,
        },
      });
      return deleted;
    } catch (err) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
