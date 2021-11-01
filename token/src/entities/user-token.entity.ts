import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserToken {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  userId: string;

  @Column()
  token: string;
}
