/* eslint-disable indent */
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Registry } from '../../registry/entities/registry.entity';
import { User } from 'src/user/entities/user.entity';
@Entity()
export class SheetTime {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'boolean', default: true })
  pending: boolean;
  @ManyToOne((type) => User, (user) => user.time_sheets)
  user: User;
  @OneToMany((type) => Registry, (registry) => registry.sheet_time)
  registries: Registry[];
  @Column({ type: 'timestamp' })
  creaated_at: Date;
  @Column({ type: 'timestamp' })
  updated_ad: Date;
}
