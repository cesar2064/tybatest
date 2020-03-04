import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { UserTransactionService } from '../services/user-transaction.service';
import { UserTransactionEntity } from 'src/modules/database/entities/user-transaction.entity';
import { TokenHttpGuard } from '../services/token-http.guard';
import { TokenInfo } from 'src/helpers/decorators/token-info.decorator';
import { JwtPayloadModel } from '../models/jwt.model';

@Controller('transactions')
export class UserTransactionController {

    constructor(
        private readonly userTransactionSrv: UserTransactionService
    ){}

    @UseGuards(TokenHttpGuard)
    @Get('user')
    async register(@TokenInfo() tokenInfo: JwtPayloadModel): Promise<UserTransactionEntity[]> {
        return this.userTransactionSrv.findAllFromUser(tokenInfo.userId);
    }
}