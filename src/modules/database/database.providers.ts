import { Provider, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Sequelize } from 'sequelize-typescript';

import { UserEntity } from './entities/user.entity';
import { APP_ENV_CONSTANTS } from '../../app.constants';
import { createSequelizeRepositories } from '../../helpers/function-helpers';
import { UserTransactionEntity } from './entities/user-transaction.entity';

const logger = new Logger('SEQUELIZE');

const ENTITIES = [
    UserEntity,
    UserTransactionEntity
];

export const DATABASE_PROVIDERS: Provider[] = [
    {
        provide: 'SEQUELIZE',
        inject: [ConfigService],
        async useFactory(config: ConfigService) {
            const sqlLogger = (message) => logger.debug(message);
            const logging = config.get(APP_ENV_CONSTANTS.DATABASE_POSTGRES_LOGGING);
            const sequelize = new Sequelize({
                dialect: 'postgres',
                password: config.get(APP_ENV_CONSTANTS.DATABASE_POSTGRES_PASSWORD),
                database: config.get(APP_ENV_CONSTANTS.DATABASE_POSTGRES_DATABASE),
                host: config.get(APP_ENV_CONSTANTS.DATABASE_POSTGRES_HOST),
                username: config.get(APP_ENV_CONSTANTS.DATABASE_POSTGRES_USERNAME),
                logging: logging && sqlLogger,
                define: {
                    underscored: true
                }
            });
            sequelize.addModels(ENTITIES);
            return sequelize;
        }
    }
]

export const REPOSITORIES: Provider[] = createSequelizeRepositories([
    ...ENTITIES
]);