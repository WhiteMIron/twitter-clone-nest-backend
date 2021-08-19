import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './starategies/jwt.starategy';

@Module({
  imports: [ConfigModule, PassportModule],
  providers: [JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
