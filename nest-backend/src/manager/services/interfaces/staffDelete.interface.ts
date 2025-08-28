export interface StaffDeleteInterface {
  deleteStaffById(email: string): Promise<{ message: string }>;
}
