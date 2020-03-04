
import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { TokenService } from './token.service';
import { APP_CONSTANST } from 'src/app.constants';

export const AUTH_TOKEN_GUARD_COMPANY_PARAM ='companyId';

@Injectable()
export class TokenHttpGuard implements CanActivate {
  constructor(
    private readonly tokenSrv: TokenService,
    private readonly reflector: Reflector
  ) { }
  canActivate(
    context: ExecutionContext,
  ): boolean {

    const request: Request = context.switchToHttp().getRequest();
    
    const token = request.header(APP_CONSTANST.AUTH_HEADER);

    try {
      const decodedToken = this.tokenSrv.decode(token);
      request[APP_CONSTANST.REQUEST_SESSION_INFO] = decodedToken;
      return true;
    } catch(e) {
      return false;
    }
  }
}