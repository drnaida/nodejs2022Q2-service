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
import { AuthDto } from './dto/auth.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AuthService } from './auth.service';
import { checkThatThisIsUUID4 } from '../../utils/checkUUID';
import {PrismaService} from "../prisma/prisma.service";
import {CreateUserDto} from "../users/dto/create-user.dto";

@Controller('auth')
export class AuthController {
  constructor(private readonly authorizationService: AuthService) {}
  @Post('signup')
  signup(@Body() signup: CreateUserDto) {
    return this.authorizationService.signup(signup);
  }

  @Post('login')
  login(@Body() login: AuthDto) {
    return this.authorizationService.login(login);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  refresh(@Body() refresh: AuthDto) {
      console.log('bbbbbb', createAlbum.artistId);
      return this.authorizationService.refresh(createAlbum);
}
