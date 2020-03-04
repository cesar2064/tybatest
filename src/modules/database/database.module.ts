
import { Module } from '@nestjs/common';
import { DATABASE_PROVIDERS, REPOSITORIES } from '../database/database.providers';
import { ConfigModule } from '@nestjs/config';

const providers = [
    ...DATABASE_PROVIDERS,
    ...REPOSITORIES
]

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
    ],
    providers,
    exports: providers
})
export class DatabaseModule { }