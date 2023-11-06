// import { Body, Controller, Post } from '@nestjs/common';
// import { OAuth2Client } from 'google-auth-library';
// import { UserService } from 'src/services/user.services';

// @Controller()
// export class UserController {
//   constructor(private readonly userService: UserService) {}

//   @Post('/login')
//   async login(@Body('token') token): Promise<any> {
//     const ticket = await client.verifyIdToken({
//       idToken: token,
//       audience: process.env.GOOGLE_CLIENT_ID,
//     });
//     console.log(ticket.getPayload());
//     const { email, name, picture } = ticket.getPayload();
//     const data = await this.userService.login({ email, name, image: picture });

//     return { data, message: 'Success' };
//   }
// }
