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
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TracksService } from './tracks.service';
import { checkThatThisIsUUID4 } from '../../utils/checkUUID';

@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}
  @Get()
  getAll() {
    return this.tracksService.getAll();
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    try {
      if (checkThatThisIsUUID4(id)) {
        const track = await this.tracksService.getById(id);
        console.log(track);
        if (!track) {
          throw new HttpException('Track not found', HttpStatus.NOT_FOUND);
        } else {
          return track;
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
  async create(@Body() createTrack: CreateTrackDto) {
    return this.tracksService.create(createTrack);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    try {
      if (checkThatThisIsUUID4(id)) {
        const artist = this.tracksService.getById(id);
        return this.tracksService.remove(id);
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
  update(@Body() updateProduct: UpdateTrackDto, @Param('id') id: string) {
    try {
      if (checkThatThisIsUUID4(id)) {
        const artist = this.tracksService.getById(id);
        return this.tracksService.update(id, updateProduct);
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
