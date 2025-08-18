import { UpdatePasswordDTO } from 'src/manager/DTOs/updatePass.dto';
export interface PassResetInterface {
  resetPass(data: UpdatePasswordDTO): Promise<boolean>;
}
