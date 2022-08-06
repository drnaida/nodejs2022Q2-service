import { AuthService } from '../../modules/authorization/auth.service';
import { Injectable } from '@nestjs/common';
import { UnauthorizedException } from '@nestjs/common';
import { CanActivate } from '@nestjs/common';
import { ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AtGuard implements CanActivate {
  constructor(
      private readonly authService: AuthService,
      private readonly reflector: Reflector,
  ) {}

  canActivate(
      context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (authHeader) {
      const [bearer, accessToken] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !accessToken) {
        throw new UnauthorizedException();
      }

      request.user = this.authService.verifyAccessToken(accessToken);

      return true;
    }

    throw new UnauthorizedException();
  }
}