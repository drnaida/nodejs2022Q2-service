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
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-product.dto';
import { ArtistsService } from './artists.service';
import { checkThatThisIsUUID4 } from '../../utils/checkUUID';

@Controller('artists')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}
  @Get()
  getAll() {
    return this.artistsService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    try {
      if (checkThatThisIsUUID4(id)) {
        const artist = this.artistsService.getById(id);
        if (!artist) {
          throw new HttpException('Artist not found', HttpStatus.NOT_FOUND);
        } else {
          return artist;
        }
      } else {
        throw new HttpException(
          'It is not a uuid version 4',
          HttpStatus.BAD_REQUEST,
        );
      }
    } catch (err) {
      throw new HttpException(
        err.message,
        err.status,
      );
    }
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() createArtist: CreateArtistDto) {
    return this.artistsService.create(createArtist);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.artistsService.remove(id);
  }

  @Put(':id')
  update(@Body() updateProduct: UpdateArtistDto, @Param('id') id: string) {
    return this.artistsService.update(id, updateProduct);
  }
}
