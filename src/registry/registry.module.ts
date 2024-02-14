import { Module } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { RegistryController } from './registry.controller';
import { SheetTimeModule } from 'src/sheet-time/sheet-time.module';

@Module({
  providers: [RegistryService],
  controllers: [RegistryController],
  imports: [SheetTimeModule],
})
export class RegistryModule {}
