import { Controller, Get } from '@nestjs/common';

@Controller()
export class AppController {
  @Get('version')
  async login() {
    return '1.0';
  }
}