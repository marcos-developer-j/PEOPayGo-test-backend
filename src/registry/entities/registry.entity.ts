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
  @Column({ type: 'timestamp' })
  creaated_at: Date;
  @Column({ type: 'timestamp' })
  updated_ad: Date;
  // eslint-disable-next-line camelcase
  @ManyToOne((type) => SheetTime, (sheet_time) => sheet_time.registries)
  sheet_time: SheetTime;
}
