import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
  Logger,
  Res,
} from '@nestjs/common';
import { SheetTimeService } from './sheet-time.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateSheetTimeDto, UpdateSheetTimeDto } from './dto/SheetTime.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { Response } from 'express';
import { Role } from 'src/auth/models/role.model';
import { Roles } from 'src/auth/decorators/roles.decorator';
@UseGuards(JwtAuthGuard)
@Controller('sheet-time')
export class SheetTimeController {
  logger: Logger;
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly sheetTimeService: SheetTimeService) {
    this.logger = new Logger(SheetTimeController.name);
  }
  @Roles(Role.ADMIN)
  @Get()
  async findAll(@Res() res: Response) {
    try {
      const response = await this.sheetTimeService.findAll();
      this.logger.log('[GET] /sheet-time 200 ');
      res.status(200).send(response);
    } catch (error) {
      this.logger.error('[GET] /sheet-time 500 ' + error.message);
      res.status(200).send({ error: true, message: error.message });
    }
  }
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const response = await this.sheetTimeService.findOne(+id);
      this.logger.log('[GET] /sheet-time/' + id + ' 200');
      res.status(200).send(response);
    } catch (error) {
      this.logger.error('[GET] /sheet-time/' + id + ' 500 ' + error.message);
      res.status(200).send({ error: true, message: error.message });
    }
  }
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Post()
  async create(
    @Body() createSheetTimeDto: CreateSheetTimeDto,
    @Res() res: Response,
  ) {
    try {
      this.logger.log('[POST] /sheet-time 200');
      const response = await this.sheetTimeService.create(createSheetTimeDto);
      res.status(200).send(response);
    } catch (error) {
      this.logger.error('[POST] /sheet-time 500 ' + error.message);
      res.status(200).send({ error: true, message: error.message });
    }
    return;
  }
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSheetTimeDto: UpdateSheetTimeDto,
    @Res() res: Response,
  ) {
    try {
      const response = await this.sheetTimeService.update(
        +id,
        updateSheetTimeDto,
      );
      this.logger.log('[PUT] /sheet-time/' + id + ' 200');
      res.status(200).send(response);
    } catch (error) {
      this.logger.error('[PUT] /sheet-time/' + id + ' 500 ' + error.message);
      res.status(200).send({ error: true, message: error.message });
    }
  }
  @Roles(Role.ADMIN, Role.CUSTOMER)
  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.sheetTimeService.remove(+id);
      this.logger.log('[DELETE] /sheet-time/' + id + ' 200');
      res.status(200).send('Deleted');
    } catch (error) {
      this.logger.error('[DELETE] /sheet-time/' + id + ' 500 ' + error.message);
      res.status(200).send({ error: true, message: error.message });
    }
  }
}
