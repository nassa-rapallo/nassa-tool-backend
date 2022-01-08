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
    const token = this.jwtService.sign(
      { userId },
      { expiresIn: 30 * 24 * 60 * 60 },
    );
    return this.userTokenRepository.save({ userId, token });
  }

  async deleteTokenForUserId(userId: string) {
    return this.userTokenRepository.delete({ userId });
  }

  async decodeToken(data: {
    token: string;
  }): Promise<{ userId: string } | undefined> {
    const tokenToCheck = data.token.replace('Bearer ', '');

    const tokenModel = await this.userTokenRepository.findOne({
      token: tokenToCheck,
    });
    if (!tokenModel) return null;

    try {
      const tokenData = this.jwtService.decode(tokenModel.token) as {
        exp: number;
        userId: any;
      };

      if (!tokenData || tokenData.exp <= Math.floor(+new Date() / 1000))
        return undefined;
      return {
        userId: tokenData.userId,
      };
    } catch {
      return null;
    }
  }
}
