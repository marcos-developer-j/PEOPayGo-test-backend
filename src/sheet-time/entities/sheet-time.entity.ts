/* eslint-disable indent */
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Registry } from '../../registry/entities/registry.entity';
import { User } from '../../user/entities/user.entity';
@Entity()
export class SheetTime {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'boolean', default: true })
  pending: boolean;
  @ManyToOne(() => User, (user) => user.time_sheets)
  user: User;
  @OneToMany(() => Registry, (registry) => registry.sheet_time)
  registries: Registry[];
  @Column({ type: 'timestamp', default: new Date() })
  creaated_at: Date;
  @Column({ type: 'timestamp', default: new Date() })
  updated_at: Date;
}
