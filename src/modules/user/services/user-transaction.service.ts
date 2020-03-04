import { Injectable, Inject } from '@nestjs/common';
import { UserTransactionEntity } from 'src/modules/database/entities/user-transaction.entity';
import { UserTransactionCreate } from 'src/modules/database/models/user-transaction.model';

@Injectable()
export class UserTransactionService {
    constructor(
        @Inject('USERTRANSACTION_REPOSITORY') private readonly userTransactionRepo: typeof UserTransactionEntity
    ) { }

    create(userTransaction: UserTransactionCreate): Promise<UserTransactionEntity> {
        return this.userTransactionRepo.create(userTransaction);
    }

    findAllFromUser(userId: string): Promise<UserTransactionEntity[]> {
        return this.userTransactionRepo.findAll({
            where: {
                userId
            }
        })
    }
}