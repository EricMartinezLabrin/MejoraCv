import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from '@/prisma.services';
import { UserModule } from '@/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from '@/auth/auth.guard';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    { provide: 'APP_GUARD', useClass: AuthGuard },
  ],
})
export class AuthModule {}
