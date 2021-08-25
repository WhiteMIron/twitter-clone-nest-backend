import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { Repository } from 'typeorm';
import { LikeTweetOutputDto } from './dtos/likeTweet.dto';
import { Likes } from './entities/likes.entitiy';

@Injectable()
export class LikesService {
  constructor(
    @InjectRepository(Likes)
    private readonly likesRepository: Repository<Likes>,
  ) {}

  async likeTweet(
    req: Request,
    param: { tweetsId: string },
  ): Promise<LikeTweetOutputDto> {
    const like = await this.likesRepository.findOne({
      where: {
        user: req.user,
        tweet: { id: param.tweetsId },
      },
    });

    if (!like) {
      return await this.likesRepository.save({
        user: req.user,
        tweet: { id: +param.tweetsId },
      });
    }

    like.like = !like.like;

    return this.likesRepository.save(like);
  }

  async getTweetLikeCount(param: { tweetsId: string }) {
    return await this.likesRepository.count({
      where: {
        tweet: { id: param.tweetsId },
      },
    });
  }

  async getTweetIsLike(req: Request, param: { tweetsId: string }) {
    const like = await this.likesRepository.findOne({
      where: {
        tweet: { id: param.tweetsId },
        user: req.user,
      },
      select: ['like'],
    });

    if (!like) {
      return { like: false };
    }

    return like;
  }
}
