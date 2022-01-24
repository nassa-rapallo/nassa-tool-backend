import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rule {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  section: string;

  @Column({ nullable: false, unique: true })
  action: string;

  @Column('text', { array: true })
  roles: string[];
}
