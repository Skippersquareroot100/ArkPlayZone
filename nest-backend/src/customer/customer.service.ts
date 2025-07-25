import { Injectable } from '@nestjs/common';

@Injectable()
export class CustomerService {
  getDashboard(): string {
    return 'Customer Dashboard';
  }
  getUsers(): string {
    return 'List of Customers';
  }
  getUserById(id: string): string {
    return `User with ID: ${id}`;
  }
}
