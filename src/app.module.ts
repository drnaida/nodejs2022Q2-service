import { Module, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsModule } from './modules/artists/artists.module';
import { DataBaseModule } from './utils/in-memory-database.module';
import { TracksModule } from './modules/tracks/tracks.module';
import { AlbumsModule } from './modules/albums/albums.module';
import { UsersModule } from './modules/users/users.module';
import { FavoritesModule } from './modules/favorites/favorites.module';
import {PrismaModule} from "./modules/prisma/prisma.module";
import {AuthModule} from "./modules/authorization/auth.module";
import {APP_GUARD} from "@nestjs/core";
import {AtGuard} from "./utils/guards";
import {ConfigModule} from "@nestjs/config";
import {LoggerMiddleware} from "./modules/logger/logger.middleware";
import {APP_FILTER} from "@nestjs/core";
import {AllExceptionsFilter} from "./utils/filter";

@Module({
  imports: [
    ArtistsModule,
    TracksModule,
    UsersModule,
    AlbumsModule,
    DataBaseModule,
    UsersModule,
    FavoritesModule,
    PrismaModule,
    AuthModule,
      ConfigModule.forRoot({isGlobal: true}),
      LoggerModule
  ],
  controllers: [AppController],
  providers: [AppService, { provide: APP_GUARD, useClass: AtGuard }, {
    provide: APP_FILTER,
    useClass: AllExceptionsFilter,
  },],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
