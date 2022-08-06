import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(private readonly userService: UsersService) {}
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
  async signup(dto: CreateUserDto) {
    const hashed = await this.hashData(dto.password);
    const newUser = this.userService.create({
      login: dto.login,
      password: hashed,
    });
  }

  async login(dto: AuthDto) {
    return 'fgdgfd';
  }

  async refresh(dto: AuthDto) {
    return 'sdfs';
  }
}
