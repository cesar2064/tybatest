import { ModelCtor, Model, Sequelize } from 'sequelize-typescript';
import { Provider, Logger } from '@nestjs/common';
import { Client } from 'pg';
import { ResponseDataModel } from './models/response.model';

export interface HelpersDbOptions {
    dbName: string,
    username: string,
    password: string,
    host: string
}

export function createSequelizeRepositories(entities: ModelCtor<Model<any, any>>[]): Provider[] {
    return entities.map((entity) => ({
        provide: `${entity.name.replace('Entity', '').toUpperCase()}_REPOSITORY`,
        useValue: entity
    }));
}

export async function syncPostgresDatabase(
    logger: Logger,
    sequelize: Sequelize,
    dbOptions: HelpersDbOptions
): Promise<void> {
    try {
        try {
            await postgresCreateDB(
                {
                    dbName: dbOptions.dbName,
                    username: dbOptions.username,
                    password: dbOptions.password,
                    host: dbOptions.host,
                },
                logger
            );
        } catch (e) {
            logger.error(e);
        }
        await sequelize.sync();
        logger.debug('SEQUELIZE Postgres sync finished');
    } catch (e) {
        logger.error(e);
    }
}

export async function postgresCreateDB(
    dbOptions: HelpersDbOptions,
    logger: Logger
): Promise<void> {
    const conStringPri = `postgres://${dbOptions.username}:${dbOptions.password}@${dbOptions.host}/postgres`;
    const pgDbclient = new Client(conStringPri);

    try {
        await pgDbclient.connect();
        await pgDbclient.query(`CREATE database "${dbOptions.dbName}"`);
    } catch (e) {
        logger.error(e);
    }
    await pgDbclient.end();
}

export function parseResponse<T>(data: T, statusCode: number): ResponseDataModel<T> {
    return {
        statusCode,
        data
    }
}