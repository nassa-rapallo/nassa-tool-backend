import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { v4 as uuid } from 'uuid';

export enum TYPES {
  CONFIRM = 'CONFIRM',
  PASSWORD = 'PASSWORD',
}

@Entity()
export class Link {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  user_id: string;

  @Column({ nullable: false, unique: true, default: uuid() })
  link: string;

  @Column('boolean', { default: false })
  is_used: boolean;

  @Column({
    type: 'enum',
    enum: TYPES,
  })
  type: TYPES;
}
