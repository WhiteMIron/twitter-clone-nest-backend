import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGard } from 'src/auth/guards/jwt.guard';
import { CreateUserDto } from './dtos/createUser.dto';
import { LoginDto } from './dtos/login.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    return this.usersService.login(loginDto);
  }
  @UseGuards(JwtAuthGard)
  @Get('me')
  async getMe(@Req() req: Request) {
    return this.usersService.getMe(req);
  }
}
