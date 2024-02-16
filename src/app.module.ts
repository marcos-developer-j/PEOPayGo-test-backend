import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SheetTimeModule } from './sheet-time/sheet-time.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistryModule } from './registry/registry.module';
import { UserModule } from './user/user.module';
import { User } from './user/entities/user.entity';
import { Registry } from './registry/entities/registry.entity';
import { SheetTime } from './sheet-time/entities/sheet-time.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmPostgresService } from 'src/type-orm-mysql.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmPostgresService,
    }),
    SheetTimeModule,
    RegistryModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService, TypeOrmPostgresService],
})
export class AppModule {}
