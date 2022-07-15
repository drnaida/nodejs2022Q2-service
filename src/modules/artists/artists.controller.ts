import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-product.dto';

@Controller('artists')
export class ArtistsController {
  @Get()
  getAll(): string {
    return 'getAll';
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return 'GetOne' + id;
  }

  @Post()
  create(@Body() createArtist: CreateArtistDto): string {
    return `Name: ${createArtist.name}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return 'Remove ' + id;
  }

  @Put(':id')
  update(@Body() updateProductDto: UpdateArtistDto, @Param('id') id: string) {
    return 'Update' + id;
  }
}
