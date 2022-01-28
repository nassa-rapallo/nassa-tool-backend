import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: false })
  title: string;

  @Column({ type: 'text', nullable: true })
  description: string;

  @Column({ type: 'int', nullable: false })
  pageCount: number;

  @Column({ type: 'bool', default: false })
  alreadyRead: false;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  // TODO: to implement
  // book cover -> file upload
  cover: string;
  // book category -> other entity
  category: string;
}
