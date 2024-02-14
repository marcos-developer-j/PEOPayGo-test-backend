/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CreateUser, UpdateUser } from './dto/User.dto';
@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}
  async create(user: CreateUser) {
    user.password = bcrypt.hash(user.password, 10);
    const newUser = await this.usersRepository.save(user);
    return newUser;
  }
  async update(id: number, user: UpdateUser) {
    const updatedUser = await this.usersRepository.save({
      ...user,
      id: Number(id),
    });
    return updatedUser;
  }
  async remove(id: number) {
    await this.usersRepository.findOneByOrFail({ id });
    await this.usersRepository.delete({ id });
  }
  async findAll() {
    const users = await this.usersRepository.find();
    return users;
  }
  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    return user;
  }
}
