/* eslint-disable prettier/prettier */
/* eslint-disable camelcase */
import { UserService } from 'src/user/user.service';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PayloadToken } from './models/model.token';
import { User } from 'src/user/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtSetvice: JwtService,
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async validateuser(email: string, inPassword: string) {
    const isValid = await this.validUserPassword(email, inPassword);
    if (!isValid) {
      return undefined;
    }
    return isValid.user;
  }
  async validUserPassword(email: string, password: string) {
    await this.usersRepository.findOneByOrFail({ email });
    const user = await this.usersRepository.findOneBy({ email });
    const result = await bcrypt.compare(password, user.password);
    return { isValid: result, user };
  }

  async generateJWT(user: User) {
    const { id, role, email } = user;
    const payload: PayloadToken = { id, role, email };
    return {
      access_token: this.jwtSetvice.sign(payload),
      user,
    };
  }
}
