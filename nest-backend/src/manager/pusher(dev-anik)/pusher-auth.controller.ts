import { Body, Controller, Post, Req } from '@nestjs/common';
import { Request } from 'express';
import * as Pusher from 'pusher';

@Controller('pusher')
export class PusherAuthController {
  private pusher = new Pusher({
    appId: process.env.PUSHER_APP_ID!,
    key: process.env.PUSHER_KEY!,
    secret: process.env.PUSHER_SECRET!,
    cluster: process.env.PUSHER_CLUSTER!,
    useTLS: true,
  });

  /*@Post('auth')

  authenticate(@Req() req: Request) {
    const { socket_id: socketId, channel_name: channel } = req.body;

    // Use new authorizeChannel instead of deprecated authenticate
    const auth = this.pusher.authorizeChannel(socketId, channel);
    return auth; // returns JSON to frontend
  }*/

  @Post('auth')
  authenticate(@Body() body: any) {
    console.log('Body received:', body);

    const socket_id = body?.socket_id || body?.['socket_id'];
    const channel_name = body?.channel_name || body?.['channel_name'];

    if (!socket_id || !channel_name) {
      throw new Error('Missing socket_id or channel_name');
    }

    return this.pusher.authorizeChannel(socket_id, channel_name);
  }
}
