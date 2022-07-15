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
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { checkThatThisIsUUID4 } from '../../utils/checkUUID';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  getAll() {
    return this.usersService.getAll();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    try {
      if (checkThatThisIsUUID4(id)) {
        const user = this.usersService.getById(id);
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else {
          return user;
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
  create(@Body() createUser: CreateUserDto) {
    try {
      return this.usersService.create(createUser);
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
        const artist = this.usersService.getById(id);
        if (!artist) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else {
          return this.usersService.remove(id);
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

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  update(@Body() updateProduct: UpdateUserDto, @Param('id') id: string) {
    try {
      if (checkThatThisIsUUID4(id)) {
        const artist = this.usersService.getById(id);
        if (!artist) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        } else {
          return this.usersService.update(id, updateProduct);
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
}
