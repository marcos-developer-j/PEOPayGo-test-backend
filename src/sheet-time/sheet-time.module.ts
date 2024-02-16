import { Module } from '@nestjs/common';
import { SheetTimeService } from './sheet-time.service';
import { SheetTimeController } from './sheet-time.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SheetTime } from './entities/sheet-time.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SheetTime]), UserModule],
  controllers: [SheetTimeController],
  providers: [SheetTimeService],
  exports: [SheetTimeService],
})
export class SheetTimeModule {}
