/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from '../auth.service';
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(private authServices: AuthService) {
    super({ usernameField: 'email' });
  }
  async validate(email: string, password: string) {
    const user = await this.authServices.validateuser(email, password);

    if (!user) {
      throw new UnauthorizedException('Not Allow');
    }
    return user;
  }
}
