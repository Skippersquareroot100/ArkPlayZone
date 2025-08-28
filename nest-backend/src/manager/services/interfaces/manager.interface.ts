import { StaffDto } from "src/manager/DTOs/staff.dto";

export interface ManagerInterface {
  createStaff(data: StaffDto, photoFilename: string): Promise<void>;
}
