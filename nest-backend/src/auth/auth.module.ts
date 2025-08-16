import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
   imports: [
    PassportModule,
    JwtModule.register({
      secret: 'With-Great-Power-Comes-Great-Responsibility',
      signOptions: { expiresIn: '1h' },
      
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
})
export class AuthModule {}
