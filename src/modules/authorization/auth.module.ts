import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DataBaseModule } from '../../utils/in-memory-database.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TracksModule } from '../tracks/tracks.module';

@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [DataBaseModule, forwardRef(() => FavoritesModule), TracksModule],
  exports: [AuthService],
})
export class AuthModule {}
