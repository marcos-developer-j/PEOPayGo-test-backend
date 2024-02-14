import { Controller, Post, UseGuards, Req, Logger } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { AuthService } from './auth.service';
@Controller('auth')
export class AuthController {
  private logger = new Logger('Auth Controller');

  constructor(private authServices: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('login')
  async login(@Req() req) {
    const user = req.user as User;
    return this.authServices.generateJWT(user);
  }

  /*
  * Julio 25 de 2023
  * Se decide dejar de dar soporte al registro y autenticación con Google y Facebook
  *
  *
  @Get('facebook-login')
  @UseGuards(AuthGuard('custom-facebook-login'))
  async facebookLogin(@Req() req, @Res() res: Response): Promise<any> {
    const { emailFound, user } = await this.authServices.existUser(
      req.user.email,
    );
    if (emailFound) {
      const out = await this.authServices.generateJWT(user);
      res.status(200).send(out).end();
    } else {
      res.status(400).send({}).end();
    }
  }

  @Post('facebook-register')
  @UseGuards(AuthGuard('custom-facebook-register'))
  async facebookRegister(
    @Req() req,
    body: { referralLink?: string },
  ): Promise<any> {
    const user: CreateBasicUserDto = {
      names: req.user.first_name,
      lastNames: req.user.last_name,
      email: req.user.email,
      password: await this.authServices.generateUUID(),
      referralLink: body.referralLink,
    };
    const newUser = await this.userService.createBasicUser(user);
    return newUser;
  }

  @Get('google-login')
  @UseGuards(AuthGuard('custom-google-login'))
  async googleLoginAuth(@Req() req, @Res() res) {
    const { emailFound, user } = await this.authServices.existUser(
      req.user.email,
    );
    if (emailFound) {
      const out = await this.authServices.generateJWT(user);
      res.status(200).send(out).end();
    } else {
      res.status(400).send({}).end();
    }
  }
  @Post('google-register')
  @UseGuards(AuthGuard('custom-google-register'))
  async googleRegisterAuth(
    @Req() req,
    @Body() body: { referralLink?: string },
  ) {
    const user: CreateBasicUserDto = {
      names: req.user.given_name,
      lastNames: req.user.family_name,
      email: req.user.email,
      password: await this.authServices.generateUUID(),
      referralLink: body.referralLink,
    };
    const newUser = await this.userService.createBasicUser(user);
    return newUser;
  }
  */
}
