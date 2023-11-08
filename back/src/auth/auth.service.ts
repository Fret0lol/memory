import { Injectable } from '@nestjs/common';
import { OAuth2Client } from 'google-auth-library';
import { PrismaClient, User } from '@prisma/client';
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
    // const { email, name, picture } = ticket.getPayload();
    
    // const data = await this.userService.login({ email, name, image: picture });

    // return { data, message: 'Success' };
    return { message: 'Success' };

  }
}

// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User, UserDocument } from 'src/model/user.schema';

// @Injectable()
// export class UserService {
//   constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

//   async login({
//     email,
//     name,
//     image,
//   }: {
//     email: string;
//     name: string;
//     image: string;
//   }): Promise<any> {
//     const user = await this.userModel.findOne({ email: email });

//     if (!user) {
//       const newUser = new this.userModel({ email, name, image });
//       await newUser.save();
//       return newUser;
//     } else {
//       console.log(user);
//       return user;
//     }
//   }
// }
