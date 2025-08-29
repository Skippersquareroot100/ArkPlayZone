import { StaffLoginDTO } from 'src/manager/DTOs/stafflogin.dto';
export interface LoginInterface {
  login(data: StaffLoginDTO): Promise<{ access_token: string; role: string }>;
}
