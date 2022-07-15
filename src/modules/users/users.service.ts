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
    return this.databaseService.getById(id, 'users');
  }

  create(artistDto: CreateUserDto) {
    const user = this.databaseService.create(artistDto, 'users');
    console.log(user);
    const time = new Date().getTime();
    user.version = 1;
    user.createdAt = +time;
    user.updatedAt = +time;
  }

  update(id: string, product: UpdatePasswordDto) {
    return this.databaseService.update(id, product, 'users');
  }

  remove(id: string) {
    return this.databaseService.remove(id, 'users');
  }
}
