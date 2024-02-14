import { Module } from '@nestjs/common';
import { SheetTimeService } from './sheet-time.service';
import { SheetTimeController } from './sheet-time.controller';
import { UserService } from 'src/user/user.service';

@Module({
  controllers: [SheetTimeController],
  providers: [SheetTimeService],
  exports: [SheetTimeService],
  imports: [UserService],
})
export class SheetTimeModule {}
