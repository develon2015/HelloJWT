import { Controller, Get, Inject, Post, Req, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtGuard } from 'src/guards/jwt.guard';
import { LocalGuard } from 'src/guards/local.guard';

@Controller('auth')
export class AuthController {
    @Inject()
    jwtService: JwtService;

    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req) {
        var token = this.jwtService.sign(req.user);
        return { token };
    }

    @Get(['name/:token', 'name'])
    @UseGuards(JwtGuard)
    name(@Req() req) {
        return { name: req.user.username };
    }
}
