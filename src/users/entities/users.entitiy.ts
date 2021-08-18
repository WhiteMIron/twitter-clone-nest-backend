import { Common } from 'src/common/entities/common.entitiy';
import { Column, Entity } from 'typeorm';

@Entity()
export class Users extends Common {
  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  nickname: string;

  @Column('varchar', { select: false })
  password: string;
}
