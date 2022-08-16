import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Role } from 'src/decorator/role.decorator';
import { JwtGuard } from 'src/guards/jwt.guard';

@Controller('core')
export class CoreController {
    @Get('reboot')
    @UseGuards(JwtGuard)
    @Role('root', 'maria')
    reboot(@Req() req) {
        return { status: 'reboot' }
    }

    @Get('shutdown')
    @UseGuards(JwtGuard)
    shutdown(@Req() req) {
        return { status: 'shutdown' }
    }
}
