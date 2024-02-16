/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateSheetTimeDto, UpdateSheetTimeDto } from './dto/SheetTime.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SheetTime } from './entities/sheet-time.entity';
import { UserService } from 'src/user/user.service';

@Injectable()
export class SheetTimeService {
  constructor(
    private readonly userService: UserService,
    @InjectRepository(SheetTime)
    private readonly sheetTimeRepository: Repository<SheetTime>,
  ) {}
  async create(timeSheet: CreateSheetTimeDto) {
    const user = await this.userService.findOne(timeSheet.user);
    const newTimeSheet = { ...timeSheet, user };
    const response = await this.sheetTimeRepository.save(newTimeSheet);
    return response;
  }

  async findAll() {
    const timeSheets = await this.sheetTimeRepository.find();
    return timeSheets;
  }

  findOne(id: number) {
    const timeSheet = this.sheetTimeRepository.findOneBy({ id });
    return timeSheet;
  }

  async update(id: number, updateSheetTimeDto: UpdateSheetTimeDto) {
    const updatedSheetTime = await this.sheetTimeRepository.save({
      ...updateSheetTimeDto,
      id: Number(id),
    });
    return updatedSheetTime;
  }

  async remove(id: number) {
    await this.sheetTimeRepository.findOneByOrFail({ id });
    await this.sheetTimeRepository.delete(id);
    return;
  }
}
