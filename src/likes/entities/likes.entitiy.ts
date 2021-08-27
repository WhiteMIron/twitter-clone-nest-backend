import { Common } from 'src/common/entities/common.entitiy';
import { Tweets } from 'src/tweets/entities/tweets.entity';
import { Users } from 'src/users/entities/users.entitiy';
import {
  Column,
  Entity,
  EntityRepository,
  JoinColumn,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Likes extends Common {
  @Column('boolean', { default: true })
  like: boolean;

  @ManyToOne(() => Users, (users) => users.likes, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  user: Users;

  @ManyToOne(() => Tweets, (tweets) => tweets.likes)
  @JoinColumn()
  tweet: Tweets;
}
