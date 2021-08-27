import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Likes } from 'src/likes/entities/likes.entitiy';
import { Repository, UpdateResult } from 'typeorm';
import { DeleteTweetOutputDto } from './dtos/deleteTweet.dto';
import { Tweets } from './entities/tweets.entity';

@Injectable()
export class TweetsService {
  constructor(
    @InjectRepository(Tweets)
    private readonly tweetsRepository: Repository<Tweets>,
    @InjectRepository(Likes)
    private readonly likesRepository: Repository<Likes>,
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

  async deleteTweet(
    req: Request,
    param: { tweetsId: string },
  ): Promise<DeleteTweetOutputDto> {
    const tweet = await this.tweetsRepository.findOne({
      where: {
        id: param.tweetsId,
        users: req.user,
      },
    });

    if (!tweet)
      throw new HttpException('UNAUTHORIZED', HttpStatus.UNAUTHORIZED);

    // const comments = await this.commentsRepository.find({
    //   where: {
    //     tweets: {
    //       id: tweet.id,
    //     },
    //   },
    // });
    const likes = await this.likesRepository.find({
      where: {
        tweet: {
          id: tweet.id,
        },
      },
    });

    // if (comments.length !== 0) {
    //   await comments.map((comment) =>
    //     this.commentsRepository.softDelete({ id: comment.id }),
    //   );
    // }
    if (likes.length !== 0) {
      await Promise.all(
        likes.map(async (like) => {
          await this.likesRepository.softDelete({ id: like.id });
        }),
      );
    }

    const deleteTweetResult = await this.tweetsRepository.softDelete({
      id: +param.tweetsId,
    });

    return deleteTweetResult.affected == 1 ? { ok: true } : { ok: false };
  }
}
