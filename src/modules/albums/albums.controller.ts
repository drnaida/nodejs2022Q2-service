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
import {PrismaService} from "../prisma/prisma.service";
import {Logger} from "@nestjs/common";

@Controller('album')
export class AlbumsController {
  private readonly logger: Logger = new Logger(AlbumsController.name);
  constructor(private readonly albumsService: AlbumsService,
              private readonly prismaService: PrismaService) {}
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
          this.logger.warn('Not found');
          throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
        } else {
          return album;
        }
      } else {
        this.logger.warn('Bad request');
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
  async create(@Body() createAlbum: CreateAlbumDto) {
      console.log('bbbbbb', createAlbum.artistId);
      return this.albumsService.create(createAlbum);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    try {
      if (checkThatThisIsUUID4(id)) {
        const artist = this.albumsService.getById(id);
        return this.albumsService.remove(id);
      } else {
        this.logger.warn('Not uuid');
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
        this.logger.warn('Not uuid');
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
