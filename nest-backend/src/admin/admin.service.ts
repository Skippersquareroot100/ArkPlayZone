import { Injectable } from "@nestjs/common";

@Injectable()
export class AdminService {
    getDashboard(): string {
        return "Admin Dashboard";
    }

    getUsers(): string {
        return "List of users";
    }
    getUserById(id: string): string {
        return `User with ID: ${id}`;
    }
    getAdminByNameAndId(name: string, id: string): string {
        return `Admin Name: ${name}, ID: ${id}`;
    }
    addAdmin(admindata: object): object {
        
        return { message: "Admin added successfully", data: admindata };
    }
}