import { Injectable, Inject } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
@Injectable()
export class TypeOrmPostgresService implements TypeOrmOptionsFactory {
  constructor(
    @Inject(ConfigService)
    private readonly config: ConfigService,
  ) {}
  public createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.config.get<string>('DATABASE_HOST') || 'localhost',
      port: this.config.get<number>('DATABASE_PORT') || 5432,
      database: this.config.get<string>('DATABASE_NAME') || 'test',
      username: this.config.get<string>('DATABASE_USER') || 'test',
      password: this.config.get<string>('DATABASE_PASSWORD') || 'test',
      entities: ['dist/**/*.entity.{ts,js}'],
      migrations: ['dist/migrations/*.{ts,js}'],
      migrationsTableName: 'typeorm_migrations',
      logger: 'file',
      synchronize: true, // never use TRUE in production!
    };
  }
}
