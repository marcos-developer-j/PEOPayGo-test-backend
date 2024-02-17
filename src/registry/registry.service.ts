/* eslint-disable camelcase */
/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Registry } from './entities/registry.entity';
import { Repository } from 'typeorm';
import { CreateRegistryDto, UpdateRegistryDto } from './dto/registry.dto';
import { SheetTimeService } from '../sheet-time/sheet-time.service';

@Injectable()
export class RegistryService {
  constructor(
    @InjectRepository(Registry)
    private readonly registryRepository: Repository<Registry>,
    private readonly timeSheetService: SheetTimeService,
  ) {}
  async create(registry: CreateRegistryDto) {
    const sheet_time = await this.timeSheetService.findOne(registry.sheet_time);
    const newRegistry = { ...registry, sheet_time };
    const response = await this.registryRepository.save(newRegistry);
    return response;
  }

  async findAll() {
    const timeSheets = await this.registryRepository.find();
    return timeSheets;
  }

  findOne(id: number) {
    const timeSheet = this.registryRepository.findOneBy({ id });
    return timeSheet;
  }

  async update(id: number, updateRegistryDto: UpdateRegistryDto) {
    await this.registryRepository.findOneByOrFail({ id });
    const updatedRegistry = await this.registryRepository.save({
      ...updateRegistryDto,
      id: Number(id),
      updated_at: new Date(),
    });
    return updatedRegistry;
  }

  async remove(id: number) {
    await this.registryRepository.findOneByOrFail({ id });
    await this.registryRepository.delete(id);
    return;
  }
}
