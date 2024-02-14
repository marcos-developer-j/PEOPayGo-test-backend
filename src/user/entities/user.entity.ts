/* eslint-disable indent */
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { SheetTime } from 'src/sheet-time/entities/sheet-time.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  password: string;
  @Column({ default: false, unique: true })
  email: string;
  @Column({ default: 'customer' })
  role: string;
  @Column({ default: () => new Date(), nullable: false })
  creaated_at: Date;
  @Column({ default: () => new Date(), nullable: false })
  updated_ad: Date;
  @OneToMany(() => SheetTime, (sheetTime) => sheetTime.user)
  time_sheets: SheetTime[];
}
