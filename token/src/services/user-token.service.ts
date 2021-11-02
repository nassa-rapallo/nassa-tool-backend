import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserToken } from 'src/entities/user-token.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserTokenService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectRepository(UserToken)
    private readonly userTokenRepository: Repository<UserToken>,
  ) {}

  async createToken(userId: string): Promise<UserToken> {
    try {
      const token = this.jwtService.sign(
        { userId },
        { expiresIn: 30 * 24 * 60 * 60 },
      );
      const saved = await this.userTokenRepository.save({ userId, token });
      return saved;
    } catch (e) {
      console.log('error', e);
    }
  }

  async deleteTokenForUserId(userId: string) {
    return this.userTokenRepository.delete({ userId });
  }

  async decodeToken(token: string) {
    const tokenModel = await this.userTokenRepository.findOne({
      token,
    });
    if (!tokenModel || !tokenModel[0]) return null;

    try {
      const tokenData = this.jwtService.decode(tokenModel[0].token) as {
        exp: number;
        userId: any;
      };
      if (!tokenData || tokenData.exp <= Math.floor(+new Date() / 1000))
        return null;
      return {
        userId: tokenData.userId,
      };
    } catch {
      return null;
    }
  }
}
