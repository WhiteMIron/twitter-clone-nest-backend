import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGard } from 'src/auth/guards/jwt.guard';
import { CreateTweetDto } from './dtos/createTweet.dto';
import { TweetsService } from './tweets.service';
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
}
