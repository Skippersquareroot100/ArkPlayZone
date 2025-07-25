import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { EmployeeService } from './employee.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Fine } from './entities/fine.entity';
import { Incident } from './entities/incedent.entity';
import { Maintenance } from './entities/maintenance.entity';
import { Usage } from './entities/usage.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Fine, Incident, Maintenance, Usage])],
  controllers: [EmployeeController],
  providers: [EmployeeService],
})
export class EmployeeModule {}
