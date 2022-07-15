import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArtistsController } from './modules/artists/artists.controller';
import { ArtistsService } from './modules/artists/artists.service';
import { ArtistsModule } from './modules/artists/products.module';

@Module({
  imports: [ArtistsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
