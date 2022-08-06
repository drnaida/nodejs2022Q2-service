import {AuthService} from "../../modules/authorization/auth.service";
import {Injectable} from "@nestjs/common";
import {UnauthorizedException} from "@nestjs/common";
import {CanActivate} from "@nestjs/common";
import {ExecutionContext} from "@nestjs/common";
import {Observable} from "rxjs";
@Injectable()
export class AtGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (authHeader) {
      const [bearer, accessToken] = authHeader.split(' ');
      console.log(authHeader);
      if (bearer !== 'Bearer' || !accessToken) {
        throw new UnauthorizedException();
      }

      request.user = this.authService.verifyAccessToken(accessToken);

      // =====
      console.log('Проверь доходит ли віполнение до сюда');
      // =====

      return true;
    }

    throw new UnauthorizedException();
  }
}
