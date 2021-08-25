import { PickType } from '@nestjs/swagger';
import { Likes } from '../entities/likes.entitiy';

export class GetTweetLikeOutputDto extends PickType(Likes, ['like'] as const) {}
