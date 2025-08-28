import { Inject, Injectable } from '@nestjs/common';
import { UpdatePasswordDTO } from '../DTOs/updatePass.dto';
import { PassResetInterface } from './interfaces/passReset.interface';
@Injectable()
export class PassResetService {
  constructor(
    @Inject('PassResetInterface')
    private readonly passresetinterface: PassResetInterface,
  ) {}

  async resetPass(data: UpdatePasswordDTO): Promise<boolean> {
    return this.passresetinterface.resetPass(data);
  }
}
