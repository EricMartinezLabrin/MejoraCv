import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { FilesModule } from './files/files.module';
import { EvalModule } from './eval/eval.module';
import { AdsTypeModule } from './ads-type/ads-type.module';

@Module({
  imports: [AuthModule, UserModule, FilesModule, EvalModule, AdsTypeModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
