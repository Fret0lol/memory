import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { PrismaService } from 'src/prisma/prisma.service';

const client = new OAuth2Client(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
);

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async loginGoogle(token: string) {
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
      return { user: newUser, message: 'Success' };
    } else {
      return { user: user, message: 'Already exist' };
    }
  }
}
