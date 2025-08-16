import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  generateToken(user: { id: number; email: string }) {
    const payload = { id: user.id, email: user.email };
    return this.jwtService.sign(payload);
  }

  verifyToken(token: string) {
    return this.jwtService.verify(token);
  }
  // swajan Barua  [ 22-46838-1 ]
  async hash_password(password: string) : Promise<string>{
    const salt = await bcrypt.genSalt(10);
    const hashed_password = await  bcrypt.hash(password,salt);
    return hashed_password;
  }
  async compare_password(password: string, hashed_password: string): Promise<boolean> {
    return await bcrypt.compare(password, hashed_password);
  }
  // end

}
