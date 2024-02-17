import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SheetTimeModule } from './sheet-time/sheet-time.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegistryModule } from './registry/registry.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmPostgresService } from 'src/type-orm-mysql.service';
import { AuthModule } from './auth/auth.module';

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
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, TypeOrmPostgresService],
})
export class AppModule {}
