/* eslint-disable prettier/prettier */
import { RegistryService } from './registry.service';
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
import { CreateRegistryDto, UpdateRegistryDto } from './dto/registry.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('registry')
export class RegistryController {
  constructor(private readonly registryService: RegistryService) {}

  @Get()
  findAll() {
    return this.registryService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.registryService.findOne(+id);
  }
  @Post()
  create(@Body() createSheetTimeDto: CreateRegistryDto) {
    return this.registryService.create(createSheetTimeDto);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSheetTimeDto: UpdateRegistryDto,
  ) {
    return this.registryService.update(+id, updateSheetTimeDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.registryService.remove(+id);
  }
}
