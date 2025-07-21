import { Module } from "@nestjs/common";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

@Module({
    imports: [],
    controllers: [AdminController],
    providers: [AdminService],
    exports: [AdminService], // Export AdminService if needed in other modules
})
export class AdminModule {}
