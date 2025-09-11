import { Inject, Injectable } from '@nestjs/common';
import { LoginInterface } from './interfaces/login.interface';
import { StaffLoginDTO } from '../DTOs/stafflogin.dto';

@Injectable()
export class Loginservice {
  constructor(
    @Inject('LoginInterface') private readonly loginInterface: LoginInterface,
  ) {}

  async login(
    data: StaffLoginDTO,
  ): Promise<{ access_token: string; role: string ; sid?: number }> {
    return this.loginInterface.login(data);
  }
}
