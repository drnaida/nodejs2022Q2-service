import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { DataBaseModule } from '../../utils/in-memory-database.module';
import { FavoritesModule } from '../favorites/favorites.module';
import { TracksModule } from '../tracks/tracks.module';
import { AtStrategy } from './strategies/at.strategy';
import { RtStrategy } from './strategies/rt.strategy';
import { JwtModule } from '@nestjs/jwt';
import {UsersModule} from "../users/users.module";
import {PrismaModule} from "../prisma/prisma.module";

@Module({
  providers: [AuthService, AtStrategy, RtStrategy],
  controllers: [AuthController],
  imports: [
    DataBaseModule,
    forwardRef(() => FavoritesModule),
    TracksModule,
    JwtModule.register({}),
    UsersModule,
    PrismaModule,
  ],
  exports: [AuthService],
})
export class AuthModule {}
