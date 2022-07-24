import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { User } from './user.entity';

@Injectable()
export class UsersService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<any> {
    return this.prismaService.user.findMany({
      select: {
        id: true,
        login: true,
        createdAt: true,
        updatedAt: true,
        version: true,
      },
    });
  }

  async getById(id: string): Promise<any> {
    return await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        login: true,
        createdAt: true,
        updatedAt: true,
        version: true,
      },
    });
  }

  async create(artistDto: CreateUserDto): Promise<any> {
    try {
      const time = Date.now();
      artistDto.createdAt = time;
      artistDto.updatedAt = time;
      console.log(artistDto);
      const created = await this.prismaService.user.create({
        data: artistDto
      });
      const { password, ...rest } = created;
      return rest;
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.BAD_REQUEST);
    }
  }

  async update(id: string, product: UpdatePasswordDto): Promise<any> {
    try {
      const user = await this.prismaService.user.findUnique({where: { id }});
      if (user) {
        const time = Date.now();
        if (user.password == product.oldPassword) {
          const answer = await this.prismaService.user.update({
            where: { id },
            data: {
              password: product.newPassword,
              version: user.version + 1,
              updatedAt: time,
            },
          });
          const { password, ...rest } = answer;
          return rest;
        } else {
          throw new HttpException(
              'Wrong previous/old password',
              HttpStatus.FORBIDDEN,
          );
        }
      } else {
        throw new HttpException(
            'Not found',
            HttpStatus.NOT_FOUND,
        );
      }

    } catch (err) {
      throw new HttpException(err.message, err.status);
    }
  }

  async remove(id: string): Promise<User> {
    try {
      const deleted = await this.prismaService.user.delete({
        where: {
          id: id,
        },
      });
      return deleted;
    } catch (err) {
      throw new HttpException('Album not found', HttpStatus.NOT_FOUND);
    }
  }
}
