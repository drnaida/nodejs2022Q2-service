import { Injectable } from '@nestjs/common';
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
  ) {}

  getAll(): Promise<Artist[]> {
    return this.prismaService.artist.findMany();
  }

  getById(id: string): Promise<Artist> {
    return this.prismaService.artist.findUnique({ where: { id } });
  }

  create(artistDto: CreateArtistDto): Promise<Artist> {
    return this.prismaService.artist.create({
      data: artistDto,
    })
  };

  update(id: string, product: UpdateArtistDto): Promise<Artist> {
    return this.prismaService.artist.update({
      where: { id },
      data: { ...product },
    });
  }

  remove(id: string): Promise<Artist> {
    const deleted = this.prismaService.artist.delete({
      where: {
        id: id,
      },
    })

    this.favoritesService.getById(id, 'artists');
    this.favoritesService.removeFavorite(id, 'artists');
    const allAlbums = this.albumsService.getAll();
    if (allAlbums.length > 0) {
      allAlbums.forEach((album) => {
        if (album.artistId == id) {
          const new_album = album;
          new_album.artistId = null;
          console.log('new_album', new_album);
          this.albumsService.update(album.id, new_album);
        }
      });
    }
    const allTracks = this.tracksService.getAll();
    if (allTracks.length > 0) {
      allTracks.forEach((track) => {
        if (track.artistId == id) {
          const new_album = track;
          new_album.artistId = null;
          console.log('new_album', new_album);
          this.tracksService.update(track.id, new_album);
        }
      });
    }
    return deleted;
  }}