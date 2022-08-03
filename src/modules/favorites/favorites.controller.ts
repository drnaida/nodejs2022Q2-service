import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { checkThatThisIsUUID4 } from '../../utils/checkUUID';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';

@Controller('favs')
export class FavoritesController {
  constructor(
    private readonly favoritesService: FavoritesService,
    private readonly artistsService: ArtistsService,
    private readonly albumsService: AlbumsService,
    private readonly tracksService: TracksService,
  ) {}
  @Get()
  getAll() {
    return this.favoritesService.getAll();
  }

  // @Post('track/:id')
  // @HttpCode(HttpStatus.CREATED)
  // createTrack(@Param('id') id: string) {
  //   try {
  //     if (checkThatThisIsUUID4(id)) {
  //       const artist = this.tracksService.getById(id);
  //       if (!artist) {
  //         throw new HttpException(
  //           'Track not found, so it cannot be added to favorites',
  //           HttpStatus.UNPROCESSABLE_ENTITY,
  //         );
  //       } else {
  //         return this.favoritesService.createFavorite(id, 'tracks');
  //       }
  //     } else {
  //       throw new HttpException(
  //         'It is not a uuid version 4',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //   } catch (err) {
  //     throw new HttpException(err.message, err.status);
  //   }
  // }
  //
  // @Delete('track/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeTrack(@Param('id') id: string) {
  //   try {
  //     if (checkThatThisIsUUID4(id)) {
  //       return this.favoritesService.removeTrack(id);
  //     } else {
  //       throw new HttpException(
  //         'It is not a uuid version 4',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //   } catch (err) {
  //     throw new HttpException(err.message, err.status);
  //   }
  // }
  //
  // @Post('album/:id')
  // @HttpCode(HttpStatus.CREATED)
  // createAlbum(@Param('id') id: string) {
  //   try {
  //     if (checkThatThisIsUUID4(id)) {
  //       const artist = this.albumsService.getById(id);
  //       if (!artist) {
  //         throw new HttpException(
  //           'Album not found, so it cannot be added to favorites',
  //           HttpStatus.UNPROCESSABLE_ENTITY,
  //         );
  //       } else {
  //         return this.favoritesService.createFavorite(id);
  //       }
  //     } else {
  //       throw new HttpException(
  //         'It is not a uuid version 4',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //   } catch (err) {
  //     throw new HttpException(err.message, err.status);
  //   }
  // }
  //
  // @Delete('album/:id')
  // @HttpCode(HttpStatus.NO_CONTENT)
  // removeAlbum(@Param('id') id: string) {
  //   try {
  //     if (checkThatThisIsUUID4(id)) {
  //       return this.favoritesService.removeAlbum(id);
  //     } else {
  //       throw new HttpException(
  //         'It is not a uuid version 4',
  //         HttpStatus.BAD_REQUEST,
  //       );
  //     }
  //   } catch (err) {
  //     throw new HttpException(err.message, err.status);
  //   }
  // }

  @Post('artist/:id')
  @HttpCode(HttpStatus.CREATED)
  async createArtist(@Param('id') id: string) {
    try {
      if (checkThatThisIsUUID4(id)) {
        const artist = await this.artistsService.getById(id);
        if (!artist) {
          throw new HttpException(
            'Artist not found, so it cannot be added to favorites',
            HttpStatus.UNPROCESSABLE_ENTITY,
          );
        } else {
          return await this.favoritesService.createArtist(id);
        }
      } else {
        throw new HttpException(
          'It is not a uuid version 4',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removeArtist(@Param('id') id: string) {
    try {
      if (checkThatThisIsUUID4(id)) {
        return this.favoritesService.removeArtist(id);
      } else {
        throw new HttpException(
          'It is not a uuid version 4',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }
}
