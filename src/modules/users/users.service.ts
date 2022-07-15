import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InMemoryDatabaseService } from '../../utils/in-memory-database.service';
import { UpdateUserDto } from './dto/update-user.dto';
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
    return this.databaseService.create(artistDto, 'users');
  }

  update(id: string, product: UpdateUserDto) {
    return this.databaseService.update(id, product, 'users');
  }

  remove(id: string) {
    return this.databaseService.remove(id, 'users');
  }
}
