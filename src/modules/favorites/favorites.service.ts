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
    const getAllTracks = await this.prismaService.tracksFavorites.findMany({
      include: {
        track: {}
      }
    });
    const showTracksInRightWay = getAllTracks.map((a) => {
      return a.track;
    });
    const getAllAlbums = await this.prismaService.albumsFavorites.findMany({
      include: {
        album: {}
      }
    });
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
        return createdArtist;
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createTrack(id: string): Promise<any> {
    try {
      const track = await this.prismaService.track.findUnique({
        where: { id },
      });
      if (track) {
        const createdTrack = await this.prismaService.tracksFavorites.create({
          data: { trackId: id },
        });
        return createdTrack;
      }
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async createAlbum(id: string): Promise<any> {
    try {
      const album = await this.prismaService.album.findUnique({
        where: { id },
      });
      if (album) {
        const createdAlbum = await this.prismaService.albumsFavorites.create({
          data: { albumId: id },
        });
        return createdAlbum;
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
      throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
    }
  }

  async removeTrack(id: string): Promise<any> {
    try {
      const deleted = await this.prismaService.tracksFavorites.delete({
        where: {
          trackId: id,
        },
      });
      return deleted;
    } catch (err) {
      throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
    }
  }

  async removeAlbum(id: string): Promise<any> {
    try {
      const deleted = await this.prismaService.albumsFavorites.delete({
        where: {
          albumId: id,
        },
      });
      return deleted;
    } catch (err) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
