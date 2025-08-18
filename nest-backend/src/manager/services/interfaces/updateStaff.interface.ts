import { UpdateStaffDTO } from 'src/manager/DTOs/updateStaff.dto';
export interface UpdateStaffInterface {
  updateStaff(data: UpdateStaffDTO): Promise<void>;
}
