import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MulterError, diskStorage } from 'multer';
import { TokenRequestDTO } from '../DTOs/requestToken.dto';
import { StaffDto } from '../DTOs/staff.dto';
import { StaffLoginDTO } from '../DTOs/stafflogin.dto';
import { VerifyOTPDTO } from '../DTOs/verifyOTP.dto';
import { Loginservice } from '../services/login.service';
import { ManagerService } from '../services/manager.service';
import { PassResetService } from '../services/passReset.service';
import { RefreshTokenService } from '../services/refreshToken.service';
import { StaffOTPService } from '../services/staffOTP.service';
import { MobileActivityDto } from '../DTOs/mobileActivity.dto';
import { MobileActivityService } from '../services/mobileActivity.service';

@Controller('manager')
export class ManagerController {
  constructor(
    private readonly managerService: ManagerService,
    private readonly loginservice: Loginservice,
    private readonly refreshTokenService: RefreshTokenService,
    private readonly staffOTPService: StaffOTPService,
    private readonly passResetService: PassResetService,
    private readonly mobileActivityService: MobileActivityService,
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
    try {
      await this.staffOTPService.generateOTP(data);
      return {
        statusCode: 200,
        message: 'OTP generated',
        error: '',
      };
    } catch (error) {
      return {
        statusCode: 500,
        message: 'Invalid email!!!   ',
        error: 'Internal server error',
      };
    }
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
    console.log('Verifying OTP for:', data.email);
    console.log('OTP:', data.otp);
    try {
      await this.staffOTPService.validateOTP(data);
      return {
        statusCode: 200,
        message: '',
        error: '',
      };
    } catch (error) {
      return {
        statusCode: 400,
        message: 'Invalid OTP',
        error: 'Bad Request',
      };
    }
  }

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
  @Post('activity')
  async createActivity(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: MobileActivityDto,
  ) {
    await this.mobileActivityService.createActivity(file, dto);
  }
}
