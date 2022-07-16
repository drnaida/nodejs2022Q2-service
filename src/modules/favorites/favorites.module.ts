import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { DataBaseModule } from '../../utils/in-memory-database.module';

@Module({
  providers: [FavoritesService],
  controllers: [FavoritesController],
  imports: [DataBaseModule],
})
export class FavoritesModule {}
