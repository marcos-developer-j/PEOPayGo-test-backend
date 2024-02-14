/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUser, UpdateUser } from './dto/User.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await this.userService.findOne(+id);
  }
  @Post()
  async create(@Body() user: CreateUser) {
    return await this.userService.create(user);
  }
  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUser: UpdateUser) {
    return await this.userService.update(+id, updateUser);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.userService.remove(+id);
  }
}
