// backend/src/auth/auth.controller.ts
import { Controller, Get, Req } from '@nestjs/common';
import { Request } from 'express';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('me')
  me(@Req() req: Request) {
    const token = req.cookies?.['jwt'];
    console.log('Token from cookies from who am i :', token);
    if (!token) {
      return { role: null };
    }
    const payload = this.authService.verifyToken(token);
    return { role: payload.role };
  }
}
