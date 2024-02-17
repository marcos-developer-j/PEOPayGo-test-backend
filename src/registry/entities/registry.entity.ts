/* eslint-disable indent */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SheetTime } from '../../sheet-time/entities/sheet-time.entity';
@Entity()
export class Registry {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: 'varchar' })
  employe: string;
  @Column({ type: 'varchar' })
  hourly_rate: number;
  @Column({ type: 'integer' })
  hours: number;
  @Column({ type: 'decimal' })
  total: number;
  @Column({ type: 'timestamp', default: new Date() })
  created_at: Date;
  @Column({ type: 'timestamp', default: new Date() })
  updated_at: Date;
  // eslint-disable-next-line camelcase
  @ManyToOne(() => SheetTime, (sheet_time) => sheet_time.registries)
  sheet_time: SheetTime;
}
