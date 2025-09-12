import { Body, Controller, Delete } from '@nestjs/common';
import { StaffDeleteService } from '../services/satffDelete.service';

@Controller('manager')
export class ManagerDELETEController {
  constructor(private readonly staffDeleteService: StaffDeleteService) {}
  @Delete('delete-staff')
  async deleteStaff(@Body('email') email: string ) {
    return this.staffDeleteService.deleteStaffById(email);
    
  }
}
