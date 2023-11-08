import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from 'src/prisma/prisma.service';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
  ) {}

  async loginGoogle(token: string): Promise<{ access_token: string }> {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    const { email, name, picture } = ticket.getPayload();

    // Unique email
    const user = await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user) {
      const newUser = await this.prisma.user.create({
        data: {
          email: email,
          name: name,
          image: picture,
        },
      });
      const token = await this.signToken(newUser.id, newUser.email);

      return { access_token: token };
    } else {
      const token = await this.signToken(user.id, user.email);

      return { access_token: token };
    }
  }

  signToken(userId: string, email: string): Promise<string> {
    const payload = {
      sub: userId,
      email: email,
    };
    return this.jwt.signAsync(payload, {
      expiresIn: '15m',
      secret: process.env.JWT_SECRET,
    });
  }
}
