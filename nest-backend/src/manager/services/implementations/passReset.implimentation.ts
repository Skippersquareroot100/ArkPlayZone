import { HttpException, Injectable } from '@nestjs/common';
import { PassResetInterface } from '../interfaces/passReset.interface';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdatePasswordDTO } from 'src/manager/DTOs/updatePass.dto';
import { Staff } from 'src/manager/entities/staff.entity';
import { Repository } from 'typeorm';
@Injectable()
export class PassResetImplementation implements PassResetInterface {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async resetPass(data: UpdatePasswordDTO): Promise<boolean> {
    console.log(data.email);
    console.log(data.password);
    const staff = await this.staffRepository.findOne({
      where: { email: data.email },
    });

    if (!staff) {
      throw new HttpException('User not found', 404);
    }
    const saltRounds = 10;
    staff.password = await bcrypt.hash(data.password, saltRounds);
    await this.staffRepository.save(staff);
    return true;
  }
}
