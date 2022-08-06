import {ForbiddenException, HttpException, HttpStatus, Injectable, UnauthorizedException} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuid } from 'uuid';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly JwtService: JwtService,
    private readonly prisma: PrismaService,
    private readonly config: ConfigService,
  ) {}
  hashData(data: string) {
    return bcrypt.hash(data, 10);
  }
  async getTokens(userId: string, email: string) {
    const [at, rt] = await Promise.all([
      this.JwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.JwtService.signAsync(
        {
          sub: userId,
          email,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async signup(dto: CreateUserDto) {
    const hashed = await this.hashData(dto.password);
    const newUser = await this.prisma.user.create({
      data: {
        id: uuid(),
        login: dto.login,
        password: hashed,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        version: 1,
      },
    });

    const tokens = await this.getTokens(newUser.id, newUser.login);
    await this.updateRtHash(newUser.id, tokens.refresh_token);
    return tokens;
  }

  async updateRtHash(userId: string, rt: string) {
    const hash = await this.hashData(rt);
    await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async login(dto: AuthDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        login: dto.login,
      },
    });

    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await bcrypt.compare(dto.password, user.password);
    if (!passwordMatches)
      throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async refreshTokens(userId: string, rt: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });

    if (!user || !user.hashedRt)
      throw new ForbiddenException('Access denied');

    const rtMatches = await bcrypt.compare(rt, user.hashedRt);
    if (!rtMatches) throw new ForbiddenException('Access denied');

    const tokens = await this.getTokens(user.id, user.login);
    await this.updateRtHash(user.id, tokens.refresh_token);
    return tokens;
  }

  async refresh(rt: string) {
    try {
      const request = await this.JwtService.verifyAsync(rt, {
        secret: this.config.get<string>('JWT_SECRET_REFRESH_KEY'),
      });

      const userId = request['userId'];
      return this.refreshTokens(userId, rt);
    } catch (error) {
      if (error.message === 'invalid signature') {
        throw new ForbiddenException(error.message);
      }
      throw new UnauthorizedException(error.message);
    }
  }
}
