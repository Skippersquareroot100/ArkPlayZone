import { Controller, Get, Param, Post, Query, Body, ParseIntPipe, UsePipes, ValidationPipe } from "@nestjs/common";
import { AdminService } from './admin.service';
import { AdminData } from './admin.dto'; // Assuming you have an interface for AdminData

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService) {}
    @Get('dashboard')
    getDashboard(): string {
        return this.adminService.getDashboard();
    }
    @Get('users')
    getUsers(): string {
        return this.adminService.getUsers();
    }
    @Get('/search/:id')
    getUserById(@Param('id',ParseIntPipe) id: string): string {
        console.log(typeof id);
        return `User with ID: ${id}`;
    }
    @Get('/find')
    getAdminByNameAndId(@Query('name') name: string, @Query('id') id: string): string {
    return this.adminService.getAdminByNameAndId(name, id);
    }   
    // @Post('addadmin')
    // addAdmin(@Body() admindata:AdminData):object {
    //     return this.adminService.addAdmin(admindata);
    // }
    @Post('addadmin')
    @UsePipes(new ValidationPipe())
    addAdmin(@Body() admindata:AdminData):object {
        return this.adminService.addAdmin(admindata);
    }

}