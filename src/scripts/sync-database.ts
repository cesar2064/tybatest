import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { Sequelize } from 'sequelize-typescript';
import '../handle-envs';
import { DatabaseModule } from '../modules/database/database.module';
import { syncPostgresDatabase } from '../helpers/function-helpers';
import { APP_ENV_CONSTANTS } from '../app.constants';

(async () => {
    const app = await NestFactory.createApplicationContext(DatabaseModule);
    const logger = new Logger('SYNC-DATABASE');
    const sequelize: Sequelize = app.get('SEQUELIZE');
    await syncPostgresDatabase(
        logger,
        sequelize,
        {
            dbName: process.env[APP_ENV_CONSTANTS.DATABASE_POSTGRES_DATABASE],
            username: process.env[APP_ENV_CONSTANTS.DATABASE_POSTGRES_USERNAME],
            password: process.env[APP_ENV_CONSTANTS.DATABASE_POSTGRES_PASSWORD],
            host: process.env[APP_ENV_CONSTANTS.DATABASE_POSTGRES_HOST]
        }
    )
})()