/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
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
    user.password = await bcrypt.hash(user.password, 10);
    if (await this.usersRepository.existsBy({ email: user.email }))
      throw new InternalServerErrorException(
        'El email ya se encuentra registrado en nuestra pagina',
      );
    const newUser = {
      ...user,
      created_at: new Date(),
      updated_at: new Date(),
    };
    const response = await this.usersRepository.save(newUser);
    return response;
  }
  async update(id: number, user: UpdateUser) {
    await this.usersRepository.findOneByOrFail({ id });
    const updatedUser = await this.usersRepository.save({
      ...user,
      id: Number(id),
      updated_at: new Date(),
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
