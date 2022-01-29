import { Categories } from 'src/shared/constants';
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
  alreadyRead: boolean;

  @Column({ type: 'uuid', nullable: false })
  userId: string;

  // TODO book category -> this can be another entity, but only if we need dynamic categories
  // anyway, it'd be an easy 1-to-many relationship
  @Column({ type: 'enum', enum: Categories, default: Categories.Fiction })
  category: Categories;

  // TODO: to implement
  // book cover -> file upload -> do we want it? (ask this!)
  // cover: string;
}
