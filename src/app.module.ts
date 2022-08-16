import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './user/user.module';
import { AppController } from './app.controller';
import { CoreController } from './core/core.controller';
import { CoreModule } from './core/core.module';

@Module({
  imports: [AuthModule, UsersModule, CoreModule],
  controllers: [AppController, CoreController],
  providers: [AppService],
})
export class AppModule {}
