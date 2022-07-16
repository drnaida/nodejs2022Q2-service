import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import { UpdatePasswordDto } from './dto/update-user.dto';
@Injectable()
export class UsersService {
  constructor(private readonly databaseService: InMemoryDatabaseService) {}

  getAll() {
    return this.databaseService.getAll('users');
  }

  getById(id: string) {
    const user = this.databaseService.getById(id, 'users');
    if (user) {
      const { password, ...rest } = user;
      return rest;
    }
  }

  create(artistDto: CreateUserDto) {
    const user = this.databaseService.create(artistDto, 'users');
    console.log(user);
    const time = new Date().getTime();
    user.version = 1;
    user.createdAt = +time;
    user.updatedAt = +time;
    const { password, ...rest } = user;
    return rest;
  }

  update(id: string, product: UpdatePasswordDto) {
    const user = this.databaseService.updatePassword(id, product, 'users');
    user.version += 1;
    const time = new Date().getTime();
    user.updatedAt = +time;
    const { password, ...rest } = user;
    return rest;
  }

  remove(id: string) {
    return this.databaseService.remove(id, 'users');
  }
}
