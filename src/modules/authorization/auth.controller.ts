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
  HttpException, Req,
    UseGuards
} from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { checkThatThisIsUUID4 } from '../../utils/checkUUID';
import {CreateUserDto} from "../users/dto/create-user.dto";
import * as bcrypt from 'bcrypt';
import {Public} from "../../utils/decorators";

@Controller('auth')
export class AuthController {
  constructor(private readonly authorizationService: AuthService) {}

  @Public()
  @Post('signup')
  async signup(@Body() signup: CreateUserDto) {
    return this.authorizationService.signup(signup);
  }

  @Public()
  @Post('login')
  login(@Body() login: AuthDto) {
    return this.authorizationService.login(login);
  }

  @Public()
  @Post('refresh')
  @HttpCode(HttpStatus.CREATED)
  async refresh(@Body() { refreshToken }) {
    return this.authorizationService.refresh(refreshToken);
  }
}
