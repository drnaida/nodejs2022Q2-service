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
  HttpException, Logger,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-product.dto';
import { ArtistsService } from './artists.service';
import { checkThatThisIsUUID4 } from '../../utils/checkUUID';

@Controller('artist')
export class ArtistsController {
  private readonly logger: Logger = new Logger(ArtistsController.name);
  constructor(private readonly artistsService: ArtistsService) {}
  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    try {
      if (checkThatThisIsUUID4(id)) {
        const artist = await this.artistsService.getById(id);
        if (artist) {
          console.log('aaaaaaa', artist);
          return artist;
        } else {
          this.logger.warn('Not found');
          throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
        }
      } else {
        this.logger.warn('Not uuid');
        throw new HttpException(
          'It is not a uuid version 4',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      this.logger.warn('Internal error');
      throw new HttpException(err.message, err.status);
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtist: CreateArtistDto) {
    try {
      return this.artistsService.create(createArtist);
    } catch (err) {
      this.logger.warn('Required field is empty');
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
        const artist = this.artistsService.getById(id);
        return this.artistsService.remove(id);
      } else {
        this.logger.warn('Not uuid');
        throw new HttpException(
          'It is not a uuid version 4',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      this.logger.warn('Internal error');
      throw new HttpException(err.message, err.status);
    }
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Body() updateProduct: UpdateArtistDto, @Param('id') id: string) {
    try {
      if (checkThatThisIsUUID4(id)) {
        const artist = this.artistsService.getById(id);
        return this.artistsService.update(id, updateProduct);
      } else {
        this.logger.warn('Not uuid');
        throw new HttpException(
          'It is not a uuid version 4',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      this.logger.warn('Internal error');
      throw new HttpException(err.message, err.status);
    }
  }
}
