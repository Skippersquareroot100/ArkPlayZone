import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManagerService } from './manager.service';
import { StaffDto } from './DTOs/staff.dto';
import { Response } from 'express';
import { diskStorage, MulterError } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { Loginservice } from './login.service';
import { StaffLoginDTO } from './DTOs/stafflogin.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';
import { TokenRequestDTO } from './DTOs/requestToken.dto';
import { RefreshTokenService } from './refreshToken.service';
import { Staff } from 'src/manager/entities/staff.entity';
import { StaffOTPService } from './staffOTP.service';
import { VerifyOTPDTO } from './DTOs/verifyOTP.dto';
import { UpdatePasswordDTO } from './DTOs/updatePass.dto';
import { PassResetService } from './passReset.service';

@Controller('manager')
export class ManagerController {
  constructor(
    private readonly managerService: ManagerService,
    private readonly loginservice: Loginservice,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly staffOTPService: StaffOTPService,
    private readonly passResetService: PassResetService,
  ) {}

  @Get('hello')
  getHello(): string {
    return 'Hello from ManagerController!';
  }

  @Post('/hello')
  hello() {
    console.log('Hello from ManagerController!');
  }

  @Post('create-staff')
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|pdf)$/)) {
          cb(null, true);
        } else {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false);
        }
      },
      limits: { fileSize: 30000000 },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, Date.now() + file.originalname);
        },
      }),
    }),
  )
  async createStaff(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: StaffDto,
  ) {
    try {
      if (file) {
        dto.file = file.filename;
      }

      await this.managerService.createStaff(dto, dto.file ?? '');
      return {
        message: 'Staff created successfully',
      };
    } catch (error) {
      throw new HttpException('Error creating staff', HttpStatus.BAD_REQUEST);
    }
  }

  @Post(':staff-login')
  async login(@Body() stafflogin: StaffLoginDTO) {
    try {
      const token = await this.loginservice.login(stafflogin);
      return {
        statusCode: 200,
        message: 'Login successful',
        error: '',
        token: token.access_token,
      };
    } catch (error) {
      if (error instanceof HttpException) {
        return {
          statusCode: error.getStatus(),
          message: '',
          error: error.message,
          token: '',
        };
      }
      return {
        statusCode: 500,
        message: '',
        error: 'Internal server error',
        token: '',
      };
    }
  }

  @Get(':profile')
  @UseGuards(JwtAuthGuard)
  async getProfile() {
    return 'your profile data';
  }

  @Get('test-token')
  @UseGuards(JwtAuthGuard)
  async testToken() {
    return {
      message: 'Token is valid!',
    };
  }

  @Post('refresh-token')
  async refresh(@Body() data: TokenRequestDTO) {
    try {
      const result = await this.refreshTokenService.refreshToken(data);
      return {
        statusCode: 200,
        message: 'Token refreshed successfully',
        error: '',
        token: result.access_token,
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Unable to refresh token',
        error.status || HttpStatus.BAD_REQUEST,
      );
    }
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @Post('forget-pass')
  async forgetPassword(@Body() data: TokenRequestDTO) {
    console.log('Generating OTP for:', data.email);
    await this.staffOTPService.generateOTP(data);
    return { message: 'OTP generated' };
  }

  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @Post('OTP-verify')
  async verifyOTP(@Body() data: VerifyOTPDTO) {
    await this.staffOTPService.validateOTP(data);
    return { message: 'OTP verified successfully' };
  }
  @UsePipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  )
  @Patch('update-pass')
  async updatePassword(@Body() data: UpdatePasswordDTO) {
    await this.passResetService.resetPass(data);
    return { message: 'Password updated successfully' };
  }
}
