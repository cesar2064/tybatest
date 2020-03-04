import { Module, HttpModule } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { ZomatoService } from './services/zomato.service';
import { UserTransactionService, TokenHttpGuard, TokenService } from '../user';
import { ZomatoController } from './controllers/zomato.controller';

@Module({
    imports: [
        DatabaseModule,
        HttpModule
    ],
    controllers: [
        ZomatoController
    ],
    providers: [
        ZomatoService,
        UserTransactionService,
        TokenHttpGuard,
        TokenService
    ]
})
export class ZomatoModule {}