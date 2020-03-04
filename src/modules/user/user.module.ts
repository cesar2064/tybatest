import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { DatabaseModule } from '../database/database.module';
import { UserController } from './controllers/user.controller';
import { CryptoService } from './services/crypto.service';
import { TokenService } from './services/token.service';
import { UserTransactionService } from './services/user-transaction.service';
import { UserTransactionController } from './controllers/user-transactions.controller';

@Module({
    imports: [
        DatabaseModule
    ],
    controllers: [
        UserController,
        UserTransactionController
    ],
    providers: [
        UserService,
        CryptoService,
        TokenService,
        UserTransactionService
    ]
})
export class UserModule { }