import { Injectable } from '@nestjs/common';
import { NameDto } from './DTOs/name.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Name } from './entities/name.entity';
@Injectable()
export class ManagerService {
  constructor(
    @InjectRepository(Name)
    private readonly nameRepository: Repository<Name>,
  ) {}
  async createName(data: NameDto): Promise<Name> {
    const nameEntity = this.nameRepository.create(data);
    return await this.nameRepository.save(nameEntity);
  }
}
