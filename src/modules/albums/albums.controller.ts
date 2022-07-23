import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  HttpCode,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumsService } from './albums.service';
import { checkThatThisIsUUID4 } from '../../utils/checkUUID';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}
  @Get()
  getAll() {
    return this.albumsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    try {
      if (checkThatThisIsUUID4(id)) {
        const album = await this.albumsService.getById(id);
        if (!album) {
          throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
        } else {
          return album;
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

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createAlbum: CreateAlbumDto) {
    try {
      return this.albumsService.create(createAlbum);
    } catch (err) {
      throw new HttpException(
        'Required filled must NOT be empty',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    try {
      if (checkThatThisIsUUID4(id)) {
        const artist = this.albumsService.getById(id);
        return this.albumsService.remove(id);
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

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Body() updateProduct: UpdateAlbumDto, @Param('id') id: string) {
    try {
      if (checkThatThisIsUUID4(id)) {
        const artist = this.albumsService.getById(id);
        return this.albumsService.update(id, updateProduct);
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
