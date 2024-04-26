import { Controller, Get, Redirect, VERSION_NEUTRAL } from '@nestjs/common';

@Controller({ version: VERSION_NEUTRAL })
export class AppController {
  @Get()
  @Redirect('/api', 301)
  index() {
    return { url: '/api' };
  }
}
