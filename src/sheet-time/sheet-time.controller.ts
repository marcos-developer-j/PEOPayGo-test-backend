import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import { SheetTimeService } from './sheet-time.service';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CreateSheetTimeDto, UpdateSheetTimeDto } from './dto/SheetTime.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
@UseGuards(JwtAuthGuard)
@Controller('sheet-time')
export class SheetTimeController {
  // eslint-disable-next-line prettier/prettier
  constructor(private readonly sheetTimeService: SheetTimeService) {}

  @Get()
  findAll() {
    return this.sheetTimeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sheetTimeService.findOne(+id);
  }
  @Post()
  create(@Body() createSheetTimeDto: CreateSheetTimeDto) {
    return this.sheetTimeService.create(createSheetTimeDto);
  }
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateSheetTimeDto: UpdateSheetTimeDto,
  ) {
    return this.sheetTimeService.update(+id, updateSheetTimeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sheetTimeService.remove(+id);
  }
}
