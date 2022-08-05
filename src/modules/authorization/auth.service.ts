import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import {PrismaService} from "../prisma/prisma.service";
import {Album} from "./album.entity";
import {Prisma} from "@prisma/client";
import {UsersService} from "../users/users.service";
import {CreateUserDto} from "../users/dto/create-user.dto";
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService
  ) {
  }

  async signup(dto: CreateUserDto) {
    const newUser = this.userService.create(dto);
  }

  async login(dto: AuthDto) {
    return 'fgdgfd';
  }

  async refresh(dto: AuthDto) {
    return 'sdfs';
  }
}