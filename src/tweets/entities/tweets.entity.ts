import { Common } from 'src/common/entities/common.entitiy';
import { Likes } from 'src/likes/entities/likes.entitiy';
import { Users } from 'src/users/entities/users.entitiy';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Tweets extends Common {
  @Column('varchar')
  tweet: string;

  @ManyToOne(() => Users, (users) => users.tweets, {
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinColumn()
  users: Users;

  @OneToMany(() => Likes, (likes) => likes.tweet)
  likes: Likes[];
}
