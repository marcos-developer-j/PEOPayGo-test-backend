import { Module } from '@nestjs/common';
import { RegistryService } from './registry.service';
import { RegistryController } from './registry.controller';
import { SheetTimeModule } from 'src/sheet-time/sheet-time.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Registry } from './entities/registry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Registry]), SheetTimeModule],
  providers: [RegistryService],
  controllers: [RegistryController],
})
export class RegistryModule {}
