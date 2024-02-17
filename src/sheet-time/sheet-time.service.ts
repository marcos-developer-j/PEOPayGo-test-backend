/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { CreateSheetTimeDto, UpdateSheetTimeDto } from './dto/SheetTime.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SheetTime } from './entities/sheet-time.entity';
import { UserService } from '../user/user.service';

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
    const timeSheets = await this.sheetTimeRepository.find({
      select: { user: { name: true, id: true } },
      relations: { user: true, registries:true },
    });
    return timeSheets;
  }

  async findOne(id: number) {
    const timeSheet = await this.sheetTimeRepository.findOne({
      where: { id },
      relations: { registries: true },
    });
    return timeSheet;
  }

  async update(id: number, updateSheetTimeDto: UpdateSheetTimeDto) {
    await this.sheetTimeRepository.findOneOrFail({
      where: { id },
    });
    /*     updateSheetTimeDto = { ...sheetTime, ...updateSheetTimeDto }; */
    const updatedSheetTime = await this.sheetTimeRepository.save({
      ...updateSheetTimeDto,
      id: Number(id),
      updated_at:new Date()
    });
    return updatedSheetTime;
  }

  async remove(id: number) {
    await this.sheetTimeRepository.findOneByOrFail({ id });
    await this.sheetTimeRepository.delete(id);
    return;
  }
}
