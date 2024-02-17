/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser, UpdateUser } from './dto/User.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Request, Response } from 'express';
import { RolesGuard } from 'src/auth/guards/roles.guard';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { Role } from 'src/auth/models/role.model';
@UseGuards(JwtAuthGuard)
@UseGuards(RolesGuard)
@Controller('user')
export class UserController {
  logger: Logger;
  constructor(private readonly userService: UserService) {
    this.logger = new Logger(UserController.name);
  }
  @Roles(Role.ADMIN)
  @Get()
  async findAll(@Req() req: Request, @Res() res: Response) {
    try {
      const response = await this.userService.findAll();
      this.logger.log('[GET] /user 200');
      res.status(200).send(response);
    } catch (error) {
      this.logger.error('[GET] /user 500 ' + error.message);
      res.status(200).send({ error: true, message: error.message });
    }
  }

  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get('/me')
  async getMe(@Req() req: Request, @Res() res: Response) {
    try {
      const userRequest: any = req.user;
      const response = await this.userService.findOne(userRequest.id);
      this.logger.log('[GET] /user/me 200 ');
      res.status(200).send(response);
    } catch (error) {
      this.logger.error('[GET] /user/me 500 ' + error.message);
      res.status(500).send({ error: true, message: error.message });
    }
  }
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.userService.findOne(+id);
      this.logger.log('[GET] /user/' + id + ' 200 ');
      res.status(200).send(response);
    } catch (error) {
      this.logger.error('[GET] /user/' + id + ' 500 ' + error.message);
      res.status(500).send({ error: true, message: error.message });
    }
    return;
  }
  @Roles(Role.ADMIN)
  @Post()
  async create(@Body() user: CreateUser, @Res() res: Response) {
    try {
      const response = await this.userService.create(user);
      this.logger.log('[POST] /user/  200 ');
      res.status(200).send(response);
    } catch (error) {
      this.logger.error('[POST] /user ' + error.message);
      res.status(500).send({ error: true, message: error.message });
    }
  }
  @Roles(Role.ADMIN)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUser: UpdateUser,
    @Res() res: Response,
  ) {
    try {
      const response = await this.userService.update(+id, updateUser);
      this.logger.log('[PUT] /user/' + id + ' 200');
      res.status(200).send(response);
    } catch (error) {
      this.logger.error('[PUT] /user/' + id + ' 500 ' + error.message);
      res.status(500).send({ error: true, message: error.message });
    }
  }
  @Roles(Role.ADMIN)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.userService.remove(+id);
      this.logger.log('[DELETE] /user/' + id + ' 200 ');
      res.status(200).send('Deleted');
    } catch (error) {
      this.logger.error('[DELETE] /user/' + id + ' 500 ' + error.message);
      res.status(500).send({ error: true, message: error.message });
    }
  }
}
