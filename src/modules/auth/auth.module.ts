import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthenticationService } from '@services/authentication.service';
import { GoogleOAuthStrategy } from '@strategies/google-oauth.strategy';
import { UserModule } from '@modules/user/user.module';
import { AuthenticationController } from '@controllers/authentication.controller';
import { SharedModule } from '@shared/shared.module';

@Module({
  imports: [UserModule, PassportModule, SharedModule],
  providers: [AuthenticationService, GoogleOAuthStrategy],
  controllers: [AuthenticationController],
  exports: [AuthenticationService],
})
export class AuthModule {}