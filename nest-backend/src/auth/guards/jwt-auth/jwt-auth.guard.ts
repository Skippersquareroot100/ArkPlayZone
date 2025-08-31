import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.headers['authorization'] || '';
    const [bearer, token] = authHeader.split(' ');

    if (!token || bearer !== 'Bearer') {
      throw new UnauthorizedException('Missing or invalid token');
    }

    try {
      const payload = this.jwtService.verify(token);
      request['user'] = payload; // attach user to request
      return true;
    } catch {
      throw new UnauthorizedException('Token expired or invalid');
    }
  }
}
