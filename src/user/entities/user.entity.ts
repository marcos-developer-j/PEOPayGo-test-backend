/* eslint-disable indent */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SheetTime } from 'src/sheet-time/entities/sheet-time.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id!: number;
  @Column({ type: 'varchar' })
  name: string;
  @Column({ type: 'varchar' })
  password: string;
  @Column({ type: 'varchar', default: false, unique: true })
  email: string;
  @Column({ type: 'varchar', default: 'customer' })
  role: string;
  @Column({ type: 'timestamp' })
  creaated_at: Date;
  @Column({ type: 'timestamp' })
  updated_ad: Date;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  @OneToMany((type) => SheetTime, (sheetTime) => sheetTime.user)
  time_sheets: SheetTime[];
}
