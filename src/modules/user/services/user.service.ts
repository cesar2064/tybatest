import { Injectable, Inject, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../../database/entities/user.entity';
import { UserCreateModel, UserLoginResponse } from '../../database/models/user.model';
import { CryptoService } from './crypto.service';
import * as uuidv4 from 'uuid/v4';
import { UserErrors } from '../models/error.model';
import { TokenService } from './token.service';
import { UserTransactionService } from './user-transaction.service';
import { UserTransactionName } from 'src/modules/database/models/user-transaction.model';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY') private readonly userRepo: typeof UserEntity,
        private readonly cryptoSrv: CryptoService,
        private readonly tokenSrv: TokenService,
        private readonly userTransactionSrv: UserTransactionService
    ) { }

    create(user: UserCreateModel) {
        const id = uuidv4();
        user.password = this.cryptoSrv.encryptSha512(user.password, id);
        return this.userRepo.create({
            id,
            ...user
        });
    }

    async login(email: string, password: string): Promise<UserLoginResponse> {
        const userRow = await this.userRepo.findOne({
            where: {
                email
            }
        });
        if (!userRow) {
            throw new NotFoundException(UserErrors.notFound);
        }
        if (!this.cryptoSrv.encryptSha512Match(password, userRow.password, userRow.id)) {
            throw new UnauthorizedException(UserErrors.passwordMissMatch);
        }
        await this.userTransactionSrv.create({
            name: UserTransactionName.Login,
            userId: userRow.id
        });
        const token = this.tokenSrv.create({ userId: userRow.id });
        return {
            token
        }
    }
}