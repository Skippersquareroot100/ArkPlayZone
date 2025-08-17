import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Staff } from './entities/staff.entity';
import { Repository } from 'typeorm';
import { UpdatePasswordDTO } from './DTOs/updatePass.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class PassResetService {
  constructor(
    @InjectRepository(Staff)
    private readonly staffRepository: Repository<Staff>,
  ) {}

  async resetPass(data: UpdatePasswordDTO) {
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
