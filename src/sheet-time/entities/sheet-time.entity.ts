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
  id: number;
  @Column()
  name: string;
  @Column({ default: true })
  pending: boolean;
  @ManyToOne(() => User, (user) => user.time_sheets)
  user: User;
  @OneToMany(() => Registry, (registry) => registry.sheet_time)
  registries: Registry[];
  @Column({ default: () => new Date(), nullable: false })
  creaated_at: Date;
  @Column({ default: () => new Date(), nullable: false })
  updated_ad: Date;
}
