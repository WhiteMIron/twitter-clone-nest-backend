import { Common } from 'src/common/entities/common.entitiy';
import { Tweets } from 'src/tweets/entities/tweets.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Users extends Common {
  @Column('varchar', { unique: true })
  email: string;

  @Column('varchar')
  nickname: string;

  @Column('varchar', { select: false })
  password: string;

  @OneToMany(() => Tweets, (tweets) => tweets.users)
  tweets: Tweets[];
}
