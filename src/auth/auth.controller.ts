import { Controller, Post, UseGuards, Req, Logger, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/user/entities/user.entity';
import { AuthService } from './auth.service';
import { Response } from 'express';
@Controller('auth')
export class AuthController {
  private logger = new Logger('Auth Controller');

  constructor(private authServices: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req, @Res() res: Response) {
    try {
      const user = req.user as User;
      const response = await this.authServices.generateJWT(user);
      this.logger.log('[POST] /auth/login 200');
      res.status(200).send(response);
    } catch (error) {
      this.logger.error('[POST] /auth/login 500');
      res.status(500).send({ error: true, message: error.message });
    }
  }
}
