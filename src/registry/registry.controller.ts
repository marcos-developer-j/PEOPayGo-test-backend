/* eslint-disable prettier/prettier */
import { RegistryService } from './registry.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  Post,
  Put,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateRegistryDto, UpdateRegistryDto } from './dto/registry.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { Role } from 'src/auth/models/role.model';
import { Roles } from 'src/auth/decorators/roles.decorator';
@UseGuards(JwtAuthGuard)
@Controller('registry')
export class RegistryController {
  logger: Logger;
  constructor(private readonly registryService: RegistryService) {
    this.logger = new Logger(RegistryController.name);
  }
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const response = await this.registryService.findAll();
      this.logger.log('[GET] /registry 200');
      res.status(200).send(response);
    } catch (error) {
      this.logger.error('[GET] /registry 500 ' + error.message);
      res.status(500).send({ error: true, message: error.message });
    }
  }
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.registryService.findOne(+id);
      this.logger.log('[GET] /registry/' + id);
      res.status(200).send(response);
    } catch (error) {
      res.status(200).send({ error: true, message: error.message });
    }
    return;
  }
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Post()
  async create(
    @Body() createRegistryDto: CreateRegistryDto,
    @Res() res: Response,
  ) {
    try {
      const response = await this.registryService.create(createRegistryDto);
      this.logger.log('[POST] /registry 200');
      res.status(200).send(response);
    } catch (error) {
      this.logger.error('[POST] /registry 500 ' + error.message);
      res.status(200).send({ error: true, message: error.message });
    }
    return;
  }
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateRegistryDto: UpdateRegistryDto,
    @Res() res: Response,
  ) {
    try {
      const response = await this.registryService.update(
        +id,
        updateRegistryDto,
      );
      this.logger.log('[PUT] /registry/' + id + '200');
      res.status(200).send(response);
    } catch (error) {
      this.logger.error('[POST] /registry/' + id + ' 500 ' + error.message);
      res.status(200).send({ error: true, message: error.message });
    }

    return;
  }
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.registryService.remove(+id);
      this.logger.log('[DELETE] /registry/' + id + '200');
      res.status(200).send('Deleted');
    } catch (error) {
      this.logger.error('[DELETE] /registry/' + id + ' 500 ' + error.message);
      res.status(200).send({ error: true, message: error.message });
    }
    return;
  }
}
