/* eslint-disable indent */
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { SheetTime } from '../../sheet-time/entities/sheet-time.entity';
@Entity()
export class Registry {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  employe: string;
  @Column()
  hourly_rate: number;
  @Column()
  hours: number;
  @Column()
  total: number;
  @Column({ default: () => new Date(), nullable: false })
  creaated_at: Date;
  @Column({ default: () => new Date(), nullable: false })
  updated_ad: Date;
  // eslint-disable-next-line camelcase
  @ManyToOne(() => SheetTime, (sheet_time) => sheet_time.registries)
  sheet_time: SheetTime;
}
