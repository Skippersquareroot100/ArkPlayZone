import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'] || '';
    let token : string;
    
    if (authHeader) {
      const [bearer, tkn] = authHeader.split(' ');
      if (bearer !== 'Bearer' || !tkn) {
        throw new UnauthorizedException('Invalid Authorization header');
      }
      token = tkn;
    } else {
      // 2️⃣ Fallback: read HttpOnly cookie
      token = request.cookies?.jwtToken;
      if (!token) {
        throw new UnauthorizedException('No token found in header or cookie');
      }
    }

   // const [bearer, token] = authHeader.split(' ');

    // if (!token || bearer !== 'Bearer') {
    //   throw new UnauthorizedException('Missing or invalid token');
    // }

    try {
      const payload = this.jwtService.verify(token);
      request['user'] = payload; // attach user to request
      return true;
    } catch {
      throw new UnauthorizedException('Token expired or invalid');
    }
  }
}
