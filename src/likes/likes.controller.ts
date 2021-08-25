import { Controller, Get, Param, Put, Req, UseGuards } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { JwtAuthGard } from 'src/auth/guards/jwt.guard';
import { GetTweetLikeOutputDto } from './dtos/getTweetLikeOutputDto.dto';
import { LikeTweetOutputDto } from './dtos/likeTweet.dto';
import { Likes } from './entities/likes.entitiy';
import { LikesService } from './likes.service';

@ApiTags('Likes')
@Controller('likes')
export class LikesController {
  constructor(private readonly likesService: LikesService) {}

  @ApiOperation({ summary: '좋아요 기능' })
  @ApiParam({
    name: 'tweetsId',
    example: 'htt://localhost:3010/like/tweets/10',
    description: '트윗Id',
  })
  @ApiOkResponse({
    type: LikeTweetOutputDto,
    description: '좋아요',
  })
  @ApiResponse({
    status: 400,
    description: '좋아요 실패',
  })
  @UseGuards(JwtAuthGard)
  @Put('tweets/:tweetsId')
  async likeTweet(
    @Req() req,
    @Param() param: { tweetsId: string },
  ): Promise<LikeTweetOutputDto> {
    return await this.likesService.likeTweet(req, param);
  }

  @ApiOperation({ summary: '트윗 좋아요 숫자' })
  @ApiParam({
    name: 'tweetsId',
    example: 'htt://localhost:3010/like/count/tweets/10',
    description: '트윗Id',
  })
  @ApiOkResponse({
    type: Number,
    description: '좋아요 숫자',
  })
  @ApiResponse({
    status: 400,
    description: '좋아요 숫자 실패',
  })
  @Get('count/tweets/:tweetsId')
  async getTweetLikeCount(@Param() param: { tweetsId: string }) {
    return await this.likesService.getTweetLikeCount(param);
  }

  @ApiOperation({ summary: '좋아요 여부' })
  @ApiParam({
    name: 'tweetsId',
    example: 'htt://localhost:3010/like/islike/tweets/10',
    description: '트윗Id',
  })
  @ApiOkResponse({
    type: Boolean,
    description: '좋아요 여부',
  })
  @ApiResponse({
    status: 400,
    description: '좋아요 여부 실패',
  })
  @UseGuards(JwtAuthGard)
  @Get('islike/tweets/:tweetsId')
  async getTweetIsLike(
    @Req() req,
    @Param() param: { tweetsId: string },
  ): Promise<GetTweetLikeOutputDto> {
    return await this.likesService.getTweetIsLike(req, param);
  }
}
