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
import { AuthService } from './auth.service';
import { checkThatThisIsUUID4 } from '../../utils/checkUUID';
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from 'bcrypt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authorizationService: AuthService) {}

  @Post('signup')
  async signup(@Body() signup: CreateUserDto) {
    const user = this.authorizationService.signup(signup);
  }

  @Post('login')
  login(@Body() login: AuthDto) {
    return this.authorizationService.login(login);
  }

  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  refresh(@Body() refresh: AuthDto) {
    return this.authorizationService.refresh(refresh);
  }
}
