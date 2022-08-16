import { IStrategyOptionsWithRequest, Strategy, VerifyFunctionWithRequest } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {

  constructor(private authService: AuthService) {
    const opt: IStrategyOptionsWithRequest = { usernameField: 'username', passwordField: 'password', passReqToCallback: true };
    super(opt, async function (...args) {
        try {
            const user = await this.validateWithRequest(...args);
            this.success(user);
        } catch(e) {
            e.response = {
                "statusCode": 401,
                "message": "Unauthorized"
            };
            e.status = 401;
            this.error(e);
        }
    });
    Logger.log('本地策略已注册', this.constructor.name);
  }

  private validateWithRequest: VerifyFunctionWithRequest = async (request, username: string, password: string): Promise<any> => {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return {
      exp: 0,
      ...user
    }
  }

}
