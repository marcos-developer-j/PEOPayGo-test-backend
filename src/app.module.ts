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
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
    }),
    SheetTimeModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.HOST_DATABASE || 'localhost',
      port: 3306,
      username: process.env.USERNAME_DATABASE || 'root',
      password: process.env.PASS_DATABASE || 'root',
      database: process.env.NAME_DATABASE || 'test',
      entities: [User, Registry, SheetTime],
      synchronize: true,
    }),
    RegistryModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
