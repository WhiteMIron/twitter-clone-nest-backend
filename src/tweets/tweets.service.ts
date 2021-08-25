import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/users/entities/users.entitiy';
import { Repository } from 'typeorm';
import { Tweets } from './entities/tweets.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweets)
    private readonly tweetsRepository: Repository<Tweets>,
  ) {}
  async createTweet(req, createTweetDto) {
    console.log(req.user);
    return await this.tweetsRepository.save({
      ...createTweetDto,
      users: req.user,
    });
  }

  async getTweets(query) {
    return await this.tweetsRepository
      .createQueryBuilder('tweets')
      .leftJoin('tweets.users', 'users')
      .select([
        'tweets.id',
        'tweets.tweet',
        'tweets.createdAt',
        'users.id',
        'users.nickname',
      ])
      .orderBy('tweets.createdAt', 'DESC')
      .take(10)
      .skip(query.page ? query.page * 10 : 0)
      .getMany();
  }
}
