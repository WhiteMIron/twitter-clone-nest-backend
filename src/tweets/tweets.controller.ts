import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGard } from 'src/auth/guards/jwt.guard';
import { UpdateResult } from 'typeorm';
import { CreateTweetDto } from './dtos/createTweet.dto';
import { DeleteTweetOutputDto } from './dtos/deleteTweet.dto';
import { TweetsService } from './tweets.service';

@ApiTags('tweets')
@Controller('tweets')
export class TweetsController {
  constructor(private readonly tweetsService: TweetsService) {}

  @UseGuards(JwtAuthGard)
  @Post()
  async createTweet(@Req() req, @Body() createTweetDto: CreateTweetDto) {
    return await this.tweetsService.createTweet(req, createTweetDto);
  }

  @Get()
  async getTweets(@Query() query: { page: string }) {
    return await this.tweetsService.getTweets(query);
  }

  @ApiOperation({ summary: '트윗 삭제' })
  @ApiOkResponse({
    type: DeleteTweetOutputDto,
    description: '트윗 삭제',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized user',
  })
  @ApiParam({
    name: 'tweetsId',
    example: 'http://localhost:3010/tweets/35',
    description: 'delete tweet',
  })
  @UseGuards(JwtAuthGard)
  @Delete(':tweetsId')
  async deleteTweets(
    @Req() req,
    @Param() param,
  ): Promise<DeleteTweetOutputDto> {
    return await this.tweetsService.deleteTweet(req, param);
  }
}
